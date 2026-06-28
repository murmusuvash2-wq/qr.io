const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sharp = require('sharp');

const ASSETS_DIR = path.join(__dirname, '../../public/assets');
const OUTPUT_DIR = path.join(__dirname, '../output');

function getFileHash(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

async function collectMetadata() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const allAssets = [];

  if (!fs.existsSync(ASSETS_DIR)) {
    console.warn(`Directory not found: ${ASSETS_DIR}`);
    return allAssets;
  }

  const categories = fs.readdirSync(ASSETS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('.'));

  for (const cat of categories) {
    const catPath = path.join(ASSETS_DIR, cat.name);
    const files = fs.readdirSync(catPath).filter(f =>
      f.endsWith('.svg') || f.endsWith('.png') || f.endsWith('.jpg')
    );

    for (const file of files) {
      const filePath = path.join(catPath, file);
      const stat = fs.statSync(filePath);
      const hash = getFileHash(filePath);

      let dimensions = { width: 0, height: 0 };
      try {
        const meta = await sharp(filePath).metadata();
        dimensions = { width: meta.width, height: meta.height };
      } catch {}

      allAssets.push({
        filename: file,
        category: cat.name,
        path: `/assets/${cat.name}/${file}`,
        format: path.extname(file).slice(1),
        size_bytes: stat.size,
        file_hash: hash,
        dimensions,
        date_added: stat.birthtime.toISOString().split('T')[0]
      });
    }
  }

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'metadata.json'),
    JSON.stringify({ total: allAssets.length, assets: allAssets }, null, 2)
  );
  console.log(`✅ Step 1: ${allAssets.length} assets metadata collected`);
  return allAssets;
}

module.exports = collectMetadata;
