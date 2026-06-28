/**
 * Adapter to use custom-qr-renderer.js ArtQREngine in React
 */

export type ArtShape = 'circle' | 'diamond' | 'hexagon' | 'star' | 'heart' | 'lotus' | 'mandala';
export type ArtStyle = 'standard' | 'wave' | 'fibonacci' | 'sakura';

export interface ArtEngineOptions {
  data: string;
  size?: number;
  shape?: ArtShape;
  artStyle?: ArtStyle;
  fgColor?: string;
  bgColor?: string;
  gradient?: { from: string; to: string };
  errorLevel?: 'L' | 'M' | 'Q' | 'H';
}

/**
 * Render QR with art style to a canvas element
 */
export function renderArtQR(
  canvas: HTMLCanvasElement,
  options: ArtEngineOptions
): void {
  // The ArtQREngine class is loaded globally from custom-qr-renderer.js
  // It needs the qrcode-generator library to be loaded first
  if (typeof (window as any).ArtQREngine === 'undefined') {
    throw new Error('ArtQREngine not loaded. Include custom-qr-renderer.js in your HTML.');
  }
  
  new (window as any).ArtQREngine(canvas, options.data, {
    size: options.size || 280,
    margin: 2,
    shape: options.shape || 'circle',
    artStyle: options.artStyle || 'standard',
    color: options.fgColor || '#111827',
    bgColor: options.bgColor || '#ffffff',
    gradient: options.gradient,
    errorCorrection: options.errorLevel || 'H',
  });
}

/**
 * Get available shapes with display info
 */
export const ART_SHAPES: { value: ArtShape; label: string; preview: string }[] = [
  { value: 'circle', label: 'Circle', preview: '⬤' },
  { value: 'diamond', label: 'Diamond', preview: '◆' },
  { value: 'hexagon', label: 'Hexagon', preview: '⬡' },
  { value: 'star', label: 'Star', preview: '★' },
  { value: 'heart', label: 'Heart', preview: '♥' },
  { value: 'lotus', label: 'Lotus', preview: '✿' },
  { value: 'mandala', label: 'Mandala', preview: '𑁍' },
];

export const ART_STYLES: { value: ArtStyle; label: string; description: string }[] = [
  { value: 'standard', label: 'Standard', description: 'Clean minimal layout' },
  { value: 'wave', label: 'Wave', description: 'Undulating wave pattern' },
  { value: 'fibonacci', label: 'Fibonacci', description: 'Golden spiral art' },
  { value: 'sakura', label: 'Sakura', description: 'Cherry blossom motif' },
];
