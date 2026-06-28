// ============================================================
// Template Engine — Core Data Models
// ============================================================

// --- Layer Types ---

export type LayerType = 'qr' | 'text' | 'image' | 'shape' | 'frame' | 'sticker' | 'background';

export type ShapeKind = 'rectangle' | 'circle' | 'ellipse' | 'line' | 'arrow' | 'star';
export type BlendMode = 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten';

export interface LayerBase {
  id: string;
  type: LayerType;
  name: string;
  visible: boolean;
  locked: boolean;
  opacity: number;          // 0 — 1
  zIndex: number;
  blendMode: BlendMode;
  
  // Position (percentage of container, 0-100)
  x: number;
  y: number;
  width: number;            // 0 = auto
  height: number;           // 0 = auto
  rotation: number;         // degrees
}

export interface QRLayer extends LayerBase {
  type: 'qr';
  data: string;                   // The QR content string
  fgColor: string;
  bgColor: string;
  dotsType: 'square' | 'dots' | 'rounded' | 'classy';
  cornersType: 'square' | 'extra-rounded' | 'dot';
  errorLevel: 'L' | 'M' | 'Q' | 'H';
  quietZone: number;              // modules
  logoImage?: string;             // embedded logo URL
  logoSize?: number;              // 0-1 percentage of QR
}

export interface TextLayer extends LayerBase {
  type: 'text';
  content: string;                // Supports {{placeholders}}
  fontFamily: string;
  fontWeight: number;             // 100-900
  fontSize: number;               // px
  lineHeight: number;             // 1.0 - 2.0
  letterSpacing: number;          // px
  textAlign: 'left' | 'center' | 'right' | 'justify';
  color: string;
  autoWrap: boolean;
  maxLines: number;               // 0 = unlimited
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
}

export interface ImageLayer extends LayerBase {
  type: 'image';
  src: string;                    // URL or data URI
  objectFit: 'contain' | 'cover' | 'fill';
  borderRadius?: number;
  borderColor?: string;
  borderWidth?: number;
}

export interface ShapeLayer extends LayerBase {
  type: 'shape';
  shapeKind: ShapeKind;
  fillColor: string;
  strokeColor?: string;
  strokeWidth?: number;
  borderRadius?: number;          // for rectangle
}

export interface FrameLayer extends LayerBase {
  type: 'frame';
  frameAssetId: string;           // references registry.json asset ID
  frameColor?: string;
  frameWidth?: number;
}

export interface StickerLayer extends LayerBase {
  type: 'sticker';
  stickerAssetId: string;         // references registry.json asset ID
}

export interface BackgroundLayer extends LayerBase {
  type: 'background';
  bgType: 'solid' | 'gradient' | 'image' | 'pattern';
  color?: string;
  gradient?: { from: string; to: string; via?: string; angle: string };
  imageSrc?: string;
  patternAssetId?: string;
}

export type AnyLayer = QRLayer | TextLayer | ImageLayer | ShapeLayer | FrameLayer | StickerLayer | BackgroundLayer;

// --- New Template Data Model (replaces old TemplateDesign) ---

export interface TemplateDocument {
  id: string;
  title: string;
  category: string;
  type: 'Pro' | 'Free';
  description: string;
  
  // Container
  canvasWidth: number;            // px at 72dpi base
  canvasHeight: number;
  backgroundColor: string;
  
  // Layers (replaces qrConfig + textElements + visualOverlay)
  layers: AnyLayer[];
  
  // Template rules
  safeZone: {
    top: number;                  // percentage
    right: number;
    bottom: number;
    left: number;
    showGuides: boolean;
  };
  
  // Placeholder definitions
  placeholders: PlaceholderDef[];
  
  // Generated fields
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  createdAt: string;
  toolId?: string;
  toolName?: string;
  
  // SEO (same as before)
  seoTitle?: string;
  metaDescription?: string;
  urlSlug?: string;
  keywords?: string;
  jsonLdSchema?: string;
}

// --- Placeholder System ---

export interface PlaceholderDef {
  key: string;                    // e.g., "name"
  syntax: string;                 // "{{name}}"
  label: string;                  // "Your Name"
  defaultValue: string;
  sourceType: 'form' | 'tool' | 'user';
  toolFieldId?: string;           // auto-map to tool form field
}

// Available placeholders per tool type
export const TOOL_PLACEHOLDERS: Record<string, PlaceholderDef[]> = {
  wifi: [
    { key: 'ssid', syntax: '{{ssid}}', label: 'WiFi Network Name', defaultValue: 'My WiFi', sourceType: 'form', toolFieldId: 'in-wifi-ssid' },
    { key: 'password', syntax: '{{password}}', label: 'WiFi Password', defaultValue: '********', sourceType: 'form', toolFieldId: 'in-wifi-pass' },
  ],
  vcard: [
    { key: 'name', syntax: '{{name}}', label: 'Your Name', defaultValue: 'Your Name', sourceType: 'form', toolFieldId: 'in-contact-name' },
    { key: 'phone', syntax: '{{phone}}', label: 'Phone Number', defaultValue: '+91 98765 43210', sourceType: 'form', toolFieldId: 'in-contact-phone' },
    { key: 'email', syntax: '{{email}}', label: 'Email Address', defaultValue: 'hello@example.com', sourceType: 'form', toolFieldId: 'in-contact-email' },
    { key: 'company', syntax: '{{company}}', label: 'Company Name', defaultValue: 'Your Company', sourceType: 'form', toolFieldId: 'company' },
  ],
  upi: [
    { key: 'vpa', syntax: '{{vpa}}', label: 'UPI ID', defaultValue: 'name@bank', sourceType: 'form', toolFieldId: 'in-upi-vpa' },
    { key: 'amount', syntax: '{{amount}}', label: 'Amount', defaultValue: '₹ 100', sourceType: 'form', toolFieldId: 'in-upi-amt' },
  ],
  url: [
    { key: 'url', syntax: '{{url}}', label: 'Website URL', defaultValue: 'https://example.com', sourceType: 'form', toolFieldId: 'target-url' },
  ],
};

// --- Typography System ---

export interface FontOption {
  family: string;
  category: 'sans-serif' | 'serif' | 'display' | 'handwriting' | 'monospace';
  weights: number[];
  googleFontName: string;         // For @import
  supportsHindi: boolean;
  previewText: string;
}

export const AVAILABLE_FONTS: FontOption[] = [
  { family: 'Inter', category: 'sans-serif', weights: [400, 500, 600, 700, 800], googleFontName: 'Inter', supportsHindi: false, previewText: 'Aa' },
  { family: 'Syne', category: 'display', weights: [400, 600, 700, 800], googleFontName: 'Syne', supportsHindi: false, previewText: 'Aa' },
  { family: 'Playfair Display', category: 'serif', weights: [400, 500, 600, 700], googleFontName: 'Playfair+Display', supportsHindi: false, previewText: 'Aa' },
  { family: 'Space Mono', category: 'monospace', weights: [400, 700], googleFontName: 'Space+Mono', supportsHindi: false, previewText: 'Aa' },
  { family: 'Nunito', category: 'sans-serif', weights: [400, 600, 700, 800], googleFontName: 'Nunito', supportsHindi: false, previewText: 'Aa' },
  { family: 'Poppins', category: 'sans-serif', weights: [400, 500, 600, 700], googleFontName: 'Poppins', supportsHindi: false, previewText: 'Aa' },
  { family: 'Noto Sans Devanagari', category: 'sans-serif', weights: [400, 500, 600, 700], googleFontName: 'Noto+Sans+Devanagari', supportsHindi: true, previewText: 'अआकख' },
  { family: 'Tiro Devanagari Hindi', category: 'serif', weights: [400], googleFontName: 'Tiro+Devanagari+Hindi', supportsHindi: true, previewText: 'अआकख' },
  { family: 'Baloo 2', category: 'display', weights: [400, 500, 600, 700, 800], googleFontName: 'Baloo+2', supportsHindi: true, previewText: 'अआकख' },
  { family: 'Mukta', category: 'sans-serif', weights: [400, 500, 600, 700], googleFontName: 'Mukta', supportsHindi: true, previewText: 'अआकख' },
];

// --- Alignment System ---

export type HorizontalAlign = 'left' | 'center' | 'right';
export type VerticalAlign = 'top' | 'middle' | 'bottom';
export type DistributeMode = 'horizontal' | 'vertical';

export interface AlignmentGuides {
  horizontalCenter: boolean;
  verticalCenter: boolean;
  snapToGrid: boolean;
  gridSize: number;           // px
}
