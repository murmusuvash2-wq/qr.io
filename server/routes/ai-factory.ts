import express from 'express';
import { suggestArtStyles, generateArtSVGPreview, ART_PROFILES } from '../ai-factory/qr-art-engine.js';
import { generateTemplate } from '../ai-factory/template-generator.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.post('/generate', async (req, res) => {
  try {
    const { toolId, toolData, industry, templateType, artProfile } = req.body;
    
    // Load asset library for generation context
    const registryPath = path.join(process.cwd(), 'public/assets/registry.json');
    let assetLibrary = {};
    if (fs.existsSync(registryPath)) {
      assetLibrary = JSON.parse(fs.readFileSync(registryPath, 'utf8')).assets || {};
    }

    const template = await generateTemplate(toolId, toolData, industry, templateType, assetLibrary, artProfile || {});
    res.json({ template });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/suggest-styles', async (req, res) => {
  try {
    const { toolData, industry } = req.body;
    const suggestions = await suggestArtStyles(toolData, industry);
    
    // Generate previews for each
    for (const sug of suggestions) {
      sug.previewSvg = generateArtSVGPreview(sug.artProfile);
    }
    
    res.json({ suggestions });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/art-profiles', (req, res) => {
  const industry = req.query.industry as string || 'tech';
  const profiles = ART_PROFILES[industry] || ART_PROFILES.tech;
  
  const withPreviews = profiles.map(p => ({
    ...p,
    previewSvg: generateArtSVGPreview(p)
  }));
  
  res.json({ profiles: withPreviews });
});

router.post('/preview-svg', (req, res) => {
  const { artProfile } = req.body;
  const svg = generateArtSVGPreview(artProfile);
  res.type('image/svg+xml').send(svg);
});

export default router;
