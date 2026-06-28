function detectDuplicates(assets) {
  const hashMap = {};
  const duplicates = [];
  const unique = [];

  for (const asset of assets) {
    if (!hashMap[asset.file_hash]) {
      hashMap[asset.file_hash] = [];
    }
    hashMap[asset.file_hash].push(asset);
  }

  for (const [hash, items] of Object.entries(hashMap)) {
    if (items.length > 1) {
      // Keep the one with largest file size (better quality)
      items.sort((a, b) => b.size_bytes - a.size_bytes);
      unique.push(items[0]);
      items.slice(1).forEach(d => {
        duplicates.push(d);
        console.warn(`⚠️ Duplicate: ${d.path} (keeping ${items[0].path})`);
      });
    } else {
      unique.push(items[0]);
    }
  }

  console.log(`✅ Step 4: ${duplicates.length} duplicates found, ${unique.length} unique assets`);
  return { unique, duplicates };
}

module.exports = detectDuplicates;
