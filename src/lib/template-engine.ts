import QRCodeStyling from 'qr-code-styling';
import type { AnyLayer, QRLayer, TextLayer, TemplateDocument, PlaceholderDef } from '../data/template-schema';

/**
 * Template Engine — Core rendering and manipulation class
 */
export class TemplateEngine {
  private template: TemplateDocument;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private placeholders: Record<string, string> = {};
  
  constructor(template: TemplateDocument) {
    this.template = template;
  }

  /**
   * Set placeholder values (auto-filled from tool form data)
   */
  setPlaceholderValues(values: Record<string, string>) {
    this.placeholders = values;
  }

  /**
   * Resolve all placeholders in text layers
   */
  resolvePlaceholders(text: string): string {
    let result = text;
    for (const [key, value] of Object.entries(this.placeholders)) {
      result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value || `{{${key}}}`);
    }
    // Also check template-level placeholder defaults
    for (const ph of this.template.placeholders || []) {
      if (!this.placeholders[ph.key]) {
        result = result.replace(new RegExp(`\\{\\{${ph.key}\\}\\}`, 'g'), ph.defaultValue);
      }
    }
    return result;
  }

  /**
   * Render all layers to a canvas at given DPI
   */
  async renderToCanvas(width: number, height: number, dpi: number = 72): Promise<HTMLCanvasElement> {
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(width * (dpi / 72));
    canvas.height = Math.round(height * (dpi / 72));
    const ctx = canvas.getContext('2d')!;
    this.canvas = canvas;
    this.ctx = ctx;

    // Fill background
    ctx.fillStyle = this.template.backgroundColor || '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Sort layers by zIndex
    const sortedLayers = [...this.template.layers].sort((a, b) => a.zIndex - b.zIndex);

    // Render each layer
    for (const layer of sortedLayers) {
      if (!layer.visible) continue;
      ctx.globalAlpha = layer.opacity !== undefined ? layer.opacity : 1;
      ctx.globalCompositeOperation = (layer.blendMode || 'normal') as GlobalCompositeOperation;
      
      switch (layer.type) {
        case 'background': await this.renderBackground(layer); break;
        case 'qr': await this.renderQR(layer, canvas.width, dpi); break;
        case 'text': await this.renderText(layer); break;
        case 'image': await this.renderImage(layer); break;
        case 'shape': this.renderShape(layer); break;
        case 'frame': await this.renderFrame(layer); break;
        case 'sticker': await this.renderSticker(layer); break;
      }
    }

    // Draw safe zone guides if enabled
    this.drawSafeGuides();

    return canvas;
  }

  private async renderBackground(layer: AnyLayer) {
    // ... render solid, gradient, image, or pattern
    // Simplified for now
  }

  private async renderQR(layer: AnyLayer, containerWidth: number, dpi: number) {
    const qrLayer = layer as QRLayer;
    const pxSize = Math.round((qrLayer.width || 50) / 100 * containerWidth);
    
    // Use qr-code-styling to render offscreen
    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.left = '-9999px';
    document.body.appendChild(div);
    
    const qr = new QRCodeStyling({
      width: pxSize,
      height: pxSize,
      data: qrLayer.data,
      dotsOptions: { color: qrLayer.fgColor, type: qrLayer.dotsType as any },
      cornersSquareOptions: { color: qrLayer.fgColor, type: qrLayer.cornersType as any },
      backgroundOptions: { color: qrLayer.bgColor },
      image: qrLayer.logoImage || undefined,
      imageOptions: { imageSize: qrLayer.logoSize || 0.3, margin: qrLayer.quietZone },
      qrOptions: { errorCorrectionLevel: qrLayer.errorLevel },
    });
    
    qr.append(div);
    await new Promise(r => setTimeout(r, 200));
    
    const qrCanvas = div.querySelector('canvas');
    if (qrCanvas) {
      const x = qrLayer.x / 100 * this.canvas!.width;
      const y = qrLayer.y / 100 * this.canvas!.height;
      this.ctx!.drawImage(qrCanvas, x, y, pxSize, pxSize);
    }
    
    document.body.removeChild(div);
  }

  private async renderText(layer: AnyLayer) {
    const textLayer = layer as TextLayer;
    const resolvedContent = this.resolvePlaceholders(textLayer.content);
    if (!resolvedContent) return;
    
    const x = textLayer.x / 100 * this.canvas!.width;
    const y = textLayer.y / 100 * this.canvas!.height;
    const maxWidth = (textLayer.width || 80) / 100 * this.canvas!.width;
    const fontSize = textLayer.fontSize * (this.canvas!.width / 800); // scale
    
    this.ctx!.font = `${textLayer.fontWeight} ${fontSize}px "${textLayer.fontFamily}"`;
    this.ctx!.fillStyle = textLayer.color;
    this.ctx!.textAlign = textLayer.textAlign as CanvasTextAlign;
    this.ctx!.textBaseline = 'top'; // Easier positioning
    this.ctx!.letterSpacing = `${textLayer.letterSpacing}px`;
    
    // Handle auto wrap
    if (textLayer.autoWrap) {
      this.wrapText(this.ctx!, resolvedContent, x, y, maxWidth, fontSize * textLayer.lineHeight, textLayer.maxLines);
    } else {
      this.ctx!.fillText(resolvedContent, x, y);
    }
  }

  private wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number, maxLines: number) {
    const words = text.split(' ');
    let line = '';
    let lineCount = 0;
    
    for (const word of words) {
      const testLine = line ? `${line} ${word}` : word;
      if (ctx.measureText(testLine).width > maxWidth && line) {
        ctx.fillText(line, x, y + lineCount * lineHeight);
        lineCount++;
        if (maxLines > 0 && lineCount >= maxLines) {
          ctx.fillText('...', x, y + (lineCount - 1) * lineHeight);
          return;
        }
        line = word;
      } else {
        line = testLine;
      }
    }
    if (line) {
      ctx.fillText(line, x, y + lineCount * lineHeight);
    }
  }

  private async renderImage(layer: AnyLayer) { /* ... */ }
  private renderShape(layer: AnyLayer) { /* ... */ }
  private async renderFrame(layer: AnyLayer) { /* ... fetch SVG, draw */ }
  private async renderSticker(layer: AnyLayer) { /* ... fetch SVG, draw */ }
  
  private drawSafeGuides() {
    if (!this.template.safeZone?.showGuides) return;
    const s = this.template.safeZone;
    const w = this.canvas!.width;
    const h = this.canvas!.height;
    
    this.ctx!.strokeStyle = 'rgba(255, 0, 0, 0.3)';
    this.ctx!.setLineDash([5, 5]);
    this.ctx!.lineWidth = 1;
    
    // Draw safe zone rectangle
    const sx = s.left / 100 * w;
    const sy = s.top / 100 * h;
    const sw = w - (s.left + s.right) / 100 * w;
    const sh = h - (s.top + s.bottom) / 100 * h;
    this.ctx!.strokeRect(sx, sy, sw, sh);
    
    // Center crosshair
    this.ctx!.beginPath();
    this.ctx!.moveTo(w / 2, 0); this.ctx!.lineTo(w / 2, h);
    this.ctx!.moveTo(0, h / 2); this.ctx!.lineTo(w, h / 2);
    this.ctx!.stroke();
    
    this.ctx!.setLineDash([]);
  }

  /**
   * Align a layer to position
   */
  alignLayer(layerId: string, horizontal: 'left' | 'center' | 'right', vertical: 'top' | 'middle' | 'bottom') {
    const layer = this.template.layers.find(l => l.id === layerId);
    if (!layer) return;
    
    const containerW = 100;
    const containerH = 100;
    
    if (horizontal === 'left') layer.x = 0;
    else if (horizontal === 'center') layer.x = (containerW - (layer.width || 20)) / 2;
    else if (horizontal === 'right') layer.x = containerW - (layer.width || 20);
    
    if (vertical === 'top') layer.y = 0;
    else if (vertical === 'middle') layer.y = (containerH - (layer.height || 10)) / 2;
    else if (vertical === 'bottom') layer.y = containerH - (layer.height || 10);
  }

  /**
   * Distribute layers evenly
   */
  distributeLayers(layerIds: string[], direction: 'horizontal' | 'vertical') {
    const layers = layerIds.map(id => this.template.layers.find(l => l.id === id)).filter(Boolean) as AnyLayer[];
    if (layers.length < 3) return;
    
    const sorted = [...layers].sort((a, b) => direction === 'horizontal' ? a.x - b.x : a.y - b.y);
    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    
    const totalSpace = direction === 'horizontal'
      ? (last.x + (last.width || 0)) - first.x
      : (last.y + (last.height || 0)) - first.y;
    
    const totalLayerSize = sorted.reduce((sum, l) => sum + (direction === 'horizontal' ? (l.width || 0) : (l.height || 0)), 0);
    const gap = (totalSpace - totalLayerSize) / (sorted.length - 1);
    
    let currentPos = direction === 'horizontal' ? first.x : first.y;
    for (let i = 0; i < sorted.length; i++) {
      if (i === 0) continue; // skip first
      const prev = sorted[i - 1];
      currentPos += (direction === 'horizontal' ? (prev.width || 0) : (prev.height || 0)) + gap;
      if (direction === 'horizontal') {
        sorted[i].y = first.y; // keep same vertical position
        sorted[i].x = currentPos;
      } else {
        sorted[i].x = first.x; // keep same horizontal position
        sorted[i].y = currentPos;
      }
    }
  }

  /**
   * Auto-scale text to fit container — reduces fontSize until text fits
   */
  autoScaleText(layerId: string) {
    const layer = this.template.layers.find(l => l.id === layerId) as TextLayer;
    if (!layer || layer.type !== 'text') return;
    
    // Use offscreen canvas to measure
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d')!;
    
    const maxWidth = (layer.width || 80) / 100 * (this.template.canvasWidth || 800);
    const resolved = this.resolvePlaceholders(layer.content);
    
    let fontSize = layer.fontSize;
    tempCtx.font = `${layer.fontWeight} ${fontSize}px "${layer.fontFamily}"`;
    
    while (tempCtx.measureText(resolved || '').width > maxWidth && fontSize > 8) {
      fontSize -= 1;
      tempCtx.font = `${layer.fontWeight} ${fontSize}px "${layer.fontFamily}"`;
    }
    
    layer.fontSize = fontSize;
  }

  /**
   * Export template as PNG at specified DPI
   */
  async exportPNG(dpi: number = 300): Promise<Blob> {
    const canvas = await this.renderToCanvas(this.template.canvasWidth, this.template.canvasHeight, dpi);
    return new Promise((resolve) => canvas.toBlob((b) => resolve(b!), 'image/png'));
  }

  /**
   * Export template as JSON (for saving/loading)
   */
  exportJSON(): string {
    return JSON.stringify(this.template, null, 2);
  }
}
