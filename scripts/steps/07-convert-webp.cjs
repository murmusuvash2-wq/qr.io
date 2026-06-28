const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function convertWebP(assets) {
  let count = 0;

  for (const asset of assets) {
    const inputPath = path.join(__dirname, '../../public/assets', asset.path.replace('/assets/', ''));
    const outputName = path.basename(asset.filename, path.extname(asset.filename)) + '.webp';
    const outputPath = path.join(__dirname, '../../public/assets', asset.category, outputName);

    if (fs.existsSync(outputPath)) {
      asset.path_webp = `/assets/${asset.category}/${outputName}`;
      continue;
    }

    if (!fs.existsSync(inputPath)) continue;

    // WebP only makes sense for raster images or backgrounds/large files
    // But per instructions, generate it for assets
    try {
      await sharp(inputPath)
        .webp({ quality: 85, alphaQuality: 100 })
        .toFile(outputPath);

      asset.path_webp = `/assets/${asset.category}/${outputName}`;
      count++;
    } catch (err) {
      console.warn(`⚠️ WebP failed for ${asset.path}: ${err.message}`);
    }
  }

  console.log(`✅ Step 7: ${count} WebP files created`);
}

module.exports = convertWebP;
