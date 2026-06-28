# Asset Library

## Overview
A2ZQR relies heavily on high-quality vector assets to differentiate its QR codes from basic generators. These assets are stored in the `/public/assets/` directory.

## Directory Structure
- `/public/assets/frames/` - SVG borders and frames (e.g., polaroid, museum-plaque).
- `/public/assets/stickers/` - Vector illustrations to overlay on or near the QR.
- `/public/assets/backgrounds/` - High-resolution or vector backgrounds (e.g., marble, cyberpunk-grid).
- `/public/assets/patterns/` - Repeating SVG patterns for the background.

## Registry Format
The application maintains a registry of assets, usually loaded via a config file or API.
Example format:
```json
{
  "id": "FRAME-000031",
  "name": "Luxury Gold Border",
  "type": "frame",
  "url": "/assets/frames/gold-luxury.svg",
  "premium": true
}
```

## Adding New Assets
1. Ensure the asset is compressed (use SVGO for vectors).
2. Place the file in the appropriate `/public/assets/` subfolder.
3. Update the asset registry JSON or database so the UI can discover it.
4. If it's a frame, ensure it has a designated "content area" defined in its metadata so the QR code can be positioned correctly inside it.
