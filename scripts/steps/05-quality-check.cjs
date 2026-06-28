const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function qualityCheck(assets) {
  const passed = [];
  const failed = [];
  const OUTPUT_DIR = path.join(__dirname, '../output');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const asset of assets) {
    const filePath = path.join(__dirname, '../../public/assets', asset.path.replace('/assets/', ''));
    const reasons = [];

    // Check file exists
    if (!fs.existsSync(filePath)) {
      failed.push({ ...asset, reason: 'FILE_NOT_FOUND' });
      continue;
    }

    // Check file size > 100 bytes
    if (asset.size_bytes < 100) {
      reasons.push('TOO_SMALL');
    }

    // Check valid format
    try {
      if (asset.format === 'svg') {
        const content = fs.readFileSync(filePath, 'utf8');
        if (!content.includes('<svg')) reasons.push('INVALID_SVG');
      } else {
        const meta = await sharp(filePath).metadata();
        if (meta.width < 50 || meta.height < 50) reasons.push('TOO_SMALL_DIMENSIONS');
      }
    } catch {
      reasons.push('CORRUPTED');
    }

    if (reasons.length > 0) {
      failed.push({ ...asset, reason: reasons.join(', ') });
    } else {
      passed.push(asset);
    }
  }

  console.log(`✅ Step 5: ${passed.length} passed, ${failed.length} failed quality check`);
  if (failed.length > 0) {
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'failed-assets.json'),
      JSON.stringify(failed, null, 2)
    );
  }
  return passed;
}

module.exports = qualityCheck;
