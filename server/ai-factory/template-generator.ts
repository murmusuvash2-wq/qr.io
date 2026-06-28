export async function generateTemplate(toolId: string, toolData: any, industry: string, templateType: string, assetLibrary: any, qrArtConfig: any) {
  const prompt = `Generate a COMPLETE ${templateType} QR code template JSON.

TOOL DETAILS:
  Name: ${toolData.name}
  Category: ${toolData.category}
  Industry: ${industry}
  Description: ${toolData.description}
  Use Cases: ${toolData.useCases?.join('; ')}

QR ART CONFIG (use these):
  Dots Shape: ${qrArtConfig.dotsStyle}
  Eye/Finder Style: ${qrArtConfig.eyesStyle || 'standard'}
  Gradient Type: ${qrArtConfig.gradientType || 'solid'}
  Frame Style: ${qrArtConfig.frameStyle || 'none'}
  Logo Style: ${qrArtConfig.logoStyle || 'center'}
  Effect: ${qrArtConfig.effect || 'none'}

AVAILABLE ASSETS (choose from these by path):
  Backgrounds: ${assetLibrary.backgrounds?.slice(0,5).map((b:any) => b.path).join(', ')}
  Frames: ${assetLibrary.frames?.slice(0,3).map((f:any) => f.path).join(', ')}
  Icons: ${assetLibrary.icons?.filter((i:any) => i.tags?.includes(industry)).map((i:any) => i.path).join(', ')}
  Stickers: ${assetLibrary.stickers?.slice(0,3).map((s:any) => s.path).join(', ')}

RETURN ONLY VALID JSON (no markdown, no explanation):

{
  "templateId": "unique-id",
  "name": "Template display name",
  "industry": "${industry}",
  "templateType": "${templateType}",
  "layout": "poster_classic | badge_circle | vcard_pro | banner_clean | sticker_rounded",
  "width": 800,
  "height": 600,
  "background": {
    "type": "gradient | solid | image",
    "value": "#hex or /assets/...svg",
    "gradient": { "from": "#hex", "to": "#hex", "angle": "135deg" } | null
  },
  "frame": {
    "asset_id": "FRAME-xxx" | null,
    "opacity": 0.8,
    "padding": 20
  },
  "qrConfig": {
    "fgColor": "#hex",
    "bgColor": "#hex | transparent",
    "dotsStyle": "${qrArtConfig.dotsStyle}",
    "cornersStyle": "${qrArtConfig.eyesStyle || 'square'}",
    "gradientType": "${qrArtConfig.gradientType || 'solid'}",
    "gradientAngle": "${qrArtConfig.gradientAngle || '0deg'}" | null,
    "frameStyle": "${qrArtConfig.frameStyle || 'none'}",
    "framePadding": ${qrArtConfig.framePadding || 0},
    "logoStyle": "${qrArtConfig.logoStyle || 'none'}",
    "logoSize": "${qrArtConfig.logoSize || '0%'}",
    "effect": "${qrArtConfig.effect || 'none'}"
  },
  "textElements": [
    {
      "content": "SCAN ME",
      "fontSize": 24,
      "color": "#hex",
      "fontWeight": "bold | extrabold | normal",
      "x": 50,
      "y": 50,
      "textAlign": "left | center | right",
      "width": 300
    }
  ],
  "safeZone": {
    "x": number, "y": number,
    "width": 300, "height": 300,
    "contrast_ratio": 4.5
  },
  "sticker": {
    "asset_id": "STICKER-xxx" | null,
    "x": number, "y": number,
    "scale": 0.8
  },
  "seo": {
    "title": "string (max 60 chars)",
    "metaDescription": "string (max 160 chars)",
    "focusKeyword": "string"
  },
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}`;

  const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta';
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  const response = await fetch(`${GEMINI_API_URL}/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        role: 'user',
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 4096,
        responseMimeType: 'application/json'
      }
    })
  });

  const data = await response.json();
  if(!data.candidates || data.candidates.length === 0) return null;
  const templateJSON = JSON.parse(data.candidates[0].content.parts[0].text);
  
  return validateTemplate(templateJSON) ? templateJSON : null;
}

function validateTemplate(t: any) {
  const checks = [];
  if (!t.safeZone || t.safeZone.width < 300) checks.push('Safe zone < 300px');
  if (!t.qrConfig) checks.push('Missing qrConfig');
  if (!t.background) checks.push('Missing background');
  if (checks.length > 0) {
    console.warn('Validation failed:', checks.join(', '));
    return false;
  }
  return true;
}
