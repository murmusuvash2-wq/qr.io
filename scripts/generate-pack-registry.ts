import fs from 'fs';
import path from 'path';
import { DESIGN_PACKS } from '../src/data/design-packs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const registry = {
  version: '1.0',
  totalPacks: DESIGN_PACKS.length,
  totalDesigns: DESIGN_PACKS.length * 8,
  packs: DESIGN_PACKS.map(p => ({
    id: p.packId,
    name: p.name,
    icon: p.icon,
    industry: p.industry,
    isPremium: p.isPremium,
    tools: p.tools?.length || 0,
    templates: 8,
    slug: p.seo?.slug || p.industry
  }))
};

const dir = path.join(__dirname, '../public/packs');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

fs.writeFileSync(
  path.join(dir, 'registry.json'),
  JSON.stringify(registry, null, 2)
);
console.log(`✅ Pack registry generated: ${DESIGN_PACKS.length} packs`);
