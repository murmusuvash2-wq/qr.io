const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { optimize } = require('svgo');

const ASSETS_DIR = path.join(__dirname, '../../public/assets');

async function processImages(assets) {
  let optimized = 0;

  for (const asset of assets) {
    const filePath = path.join(ASSETS_DIR, asset.path.replace('/assets/', ''));

    if (!fs.existsSync(filePath)) continue;

    if (asset.format === 'svg') {
      // SVGO optimization
      const svgContent = fs.readFileSync(filePath, 'utf8');
      try {
        const result = optimize(svgContent, { multipass: true });
        if (result.data && result.data.length < svgContent.length) {
          fs.writeFileSync(filePath, result.data);
          optimized++;
        }
      } catch (err) {
        console.warn(`Failed to optimize SVG: ${asset.path}`, err);
      }
    } else if (asset.format === 'png') {
      // PNG optimization via sharp
      const tempPath = filePath.replace('.png', '_opt.png');
      try {
        await sharp(filePath)
          .png({ compressionLevel: 9, palette: true })
          .toFile(tempPath);
        fs.rmSync(filePath);
        fs.renameSync(tempPath, filePath);
        optimized++;
      } catch (err) {
        console.warn(`Failed to optimize PNG: ${asset.path}`, err);
      }
    }
  }

  console.log(`✅ Step 2: ${optimized} assets optimized`);
}

module.exports = processImages;
