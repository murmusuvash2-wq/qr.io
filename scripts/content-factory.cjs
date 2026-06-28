const collectMetadata = require('./steps/01-collect-metadata.cjs');
const processImages = require('./steps/02-process-images.cjs');
const extractColors = require('./steps/03-extract-colors.cjs');
const detectDuplicates = require('./steps/04-detect-duplicates.cjs');
const qualityCheck = require('./steps/05-quality-check.cjs');
const generateThumbnails = require('./steps/06-generate-thumbnails.cjs');
const convertWebP = require('./steps/07-convert-webp.cjs');
const generateJSON = require('./steps/08-generate-json.cjs');

async function runPipeline() {
  console.log('╔══════════════════════════════════════════╗');
  console.log('║   🚀 CONTENT FACTORY PIPELINE STARTED   ║');
  console.log('╚══════════════════════════════════════════╝\\n');

  const startTime = Date.now();

  // Step 1: Collect metadata
  const allAssets = await collectMetadata();

  if (allAssets.length > 0) {
    // Step 2: Optimize images (SVGO + PNG compression)
    await processImages(allAssets);

    // Step 3: Extract colors
    await extractColors(allAssets);

    // Step 4: Remove duplicates
    const { unique, duplicates } = detectDuplicates(allAssets);

    // Step 5: Quality check
    const passed = await qualityCheck(unique);

    // Step 6: Thumbnails
    await generateThumbnails(passed);

    // Step 7: WebP conversion
    await convertWebP(passed);

    // Step 8: Final JSON
    generateJSON(passed, allAssets);
  } else {
    console.log('⚠️ No assets found. Generating empty/placeholder dataset.');
    generateJSON([], []);
  }

  const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
  console.log(`\\n✅ Pipeline complete in ${elapsed} minutes`);
}

runPipeline().catch(err => {
  console.error('❌ Pipeline failed:', err);
  process.exit(1);
});
