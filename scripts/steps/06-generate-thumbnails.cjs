const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const THUMB_DIR = path.join(__dirname, '../../public/assets/thumbnails');

async function generateThumbnails(assets) {
  fs.mkdirSync(THUMB_DIR, { recursive: true });
  let count = 0;

  for (const asset of assets) {
    const inputPath = path.join(__dirname, '../../public/assets', asset.path.replace('/assets/', ''));
    const outputName = asset.file_hash.slice(0, 12) + '.webp';
    const outputPath = path.join(THUMB_DIR, outputName);

    if (fs.existsSync(outputPath)) {
      asset.thumbnail = `/assets/thumbnails/${outputName}`;
      continue;
    }

    if (!fs.existsSync(inputPath)) continue;

    try {
      await sharp(inputPath)
        .resize(150, 150, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .webp({ quality: 80 })
        .toFile(outputPath);

      asset.thumbnail = `/assets/thumbnails/${outputName}`;
      count++;
    } catch (err) {
      console.warn(`⚠️ Thumbnail failed for ${asset.path}: ${err.message}`);
    }
  }

  console.log(`✅ Step 6: ${count} thumbnails generated (${assets.filter(a => a.thumbnail).length} total)`);
}
module.exports = generateThumbnails;
