// scripts/generate-pack-registry.cjs
// Reads: src/data/design-packs.ts
// Output: public/packs/registry.json (for API access)

const fs = require('fs');
const path = require('path');

// Read the TS file using regex (simple approach to bypass TS compilation)
const tsContent = fs.readFileSync(path.join(__dirname, '../src/data/design-packs.ts'), 'utf8');

// Extract packs array using regex or simple evaluation
let packs = [];
try {
  const arrayMatch = tsContent.match(/export const DESIGN_PACKS:\s*DesignPack\[\]\s*=\s*(\[[\s\S]*?\]);\n\n\/\/ ─── HELPERS/);
  if (arrayMatch && arrayMatch[1]) {
    // A bit hacky but works for this specific format
    const arrayStr = arrayMatch[1].replace(/(\w+):/g, '"$1":').replace(/'/g, '"');
    packs = JSON.parse(arrayStr);
  } else {
    console.error("Could not parse DESIGN_PACKS");
  }
} catch (e) {
  console.error("Error parsing ts content", e);
}

if (packs.length > 0) {
    const registry = {
      version: '1.0',
      totalPacks: packs.length,
      totalDesigns: packs.length * 8,
      packs: packs.map(p => ({
        id: p.packId,
        name: p.name,
        icon: p.icon,
        industry: p.industry,
        isPremium: p.isPremium,
        tools: p.tools?.length || 0,
        templates: 8, // fixed in this design
        slug: p.seo?.slug || p.industry
      }))
    };

    const dir = path.join(__dirname, '../public/packs');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(
      path.join(dir, 'registry.json'),
      JSON.stringify(registry, null, 2)
    );
    console.log(`✅ Pack registry generated: ${packs.length} packs`);
}
