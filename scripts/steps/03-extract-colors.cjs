const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ASSETS_DIR = path.join(__dirname, '../../public/assets');

async function extractColors(assets) {
  for (const asset of assets) {
    const filePath = path.join(ASSETS_DIR, asset.path.replace('/assets/', ''));
    if (!fs.existsSync(filePath)) {
      asset.palette = ['#000000'];
      asset.dominant_color = '#000000';
      continue;
    }
    
    let imagePath = filePath;

    // SVG → temp PNG for color extraction
    if (asset.format === 'svg') {
      const tempPng = filePath.replace('.svg', '_temp.png');
      try {
        await sharp(filePath).png().resize(200, 200).toFile(tempPng);
        imagePath = tempPng;
      } catch (err) {
        // SVG to PNG might fail depending on sharp version and SVG features
      }
    }

    try {
      if (fs.existsSync(imagePath)) {
        const { data, info } = await sharp(imagePath)
          .raw()
          .toBuffer({ resolveWithObject: true });

        // Simple color quantization: sample pixels, find 5 most common
        const colorCounts = {};
        const step = 10; // sample every 10th pixel for speed
        for (let i = 0; i < data.length; i += 4 * step) {
          const r = Math.round(data[i] / 32) * 32;
          const g = Math.round(data[i + 1] / 32) * 32;
          const b = Math.round(data[i + 2] / 32) * 32;
          const key = `${r},${g},${b}`;
          colorCounts[key] = (colorCounts[key] || 0) + 1;
        }

        const sorted = Object.entries(colorCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5);

        asset.palette = sorted.map(([key]) => {
          const [r, g, b] = key.split(',').map(Number);
          return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
        });
        asset.dominant_color = asset.palette[0] || '#000000';
      } else {
        throw new Error('File missing');
      }
    } catch (err) {
      asset.palette = ['#000000'];
      asset.dominant_color = '#000000';
    }

    // Cleanup temp PNG
    if (imagePath !== filePath && fs.existsSync(imagePath)) {
      fs.rmSync(imagePath);
    }
  }

  console.log(`✅ Step 3: Colors extracted for ${assets.length} assets`);
  return assets;
}

module.exports = extractColors;
