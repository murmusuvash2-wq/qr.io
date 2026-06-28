const fs = require('fs');
const path = require('path');

const REGISTRY_PATH = path.join(__dirname, '../../public/assets/registry.json');
const OUTPUT_DIR = path.join(__dirname, '../output');

function generateJSON(uniqueAssets, allMetadata) {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const dataset = {
    version: "1.0",
    generated_date: new Date().toISOString().split('T')[0],
    total_assets: uniqueAssets.length,
    total_raw: allMetadata.length,
    assets: uniqueAssets.map(a => ({
      id: a.id || `${a.category.toUpperCase().slice(0,2)}-${String(uniqueAssets.indexOf(a)+1).padStart(6,'0')}`,
      name: path.basename(a.filename, path.extname(a.filename)).replace(/-/g, ' ').replace(/\\b\\w/g, c => c.toUpperCase()),
      path: a.path,
      path_webp: a.path_webp || a.path,
      thumbnail: a.thumbnail || a.path,
      category: a.category,
      format: a.format,
      size_bytes: a.size_bytes,
      dimensions: a.dimensions,
      palette: a.palette || ['#000000'],
      dominant_color: a.dominant_color || '#000000',
      file_hash: a.file_hash,
      date_added: a.date_added,
      tags: a.tags || [a.category],
      license: "CC0",
      source: "content-factory"
    }))
  };

  // Read existing registry to preserve categories
  let existingRegistry = { categories: [] };
  try {
    existingRegistry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));
  } catch {}

  // Group assets by category
  const grouped = {};
  for (const asset of dataset.assets) {
    if (!grouped[asset.category]) grouped[asset.category] = [];
    grouped[asset.category].push(asset);
  }

  // Final registry
  const finalRegistry = {
    categories: existingRegistry.categories || [],
    assets: Object.keys(grouped).length > 0 ? grouped : (existingRegistry.assets || {})
  };

  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(finalRegistry, null, 2));
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'final-dataset.json'),
    JSON.stringify(dataset, null, 2)
  );

  console.log(`✅ Step 8: registry.json updated with ${dataset.assets.length} processed assets`);
  console.log(`📁 Output: scripts/output/final-dataset.json`);
}

module.exports = generateJSON;
