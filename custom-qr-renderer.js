/**
 * Custom QR Code Renderer Engine (Art & Poster QR Studio)
 * Architecture: QR Data -> QR Matrix -> Custom Renderer -> Canvas -> Art QR
 */

class ArtQREngine {
  constructor(canvasElement, data, options = {}) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d', { alpha: false });
    this.data = data;
    
    this.options = {
      size: options.size || 256,
      margin: options.margin || 2,
      shape: options.shape || 'circle', // circle, diamond, hexagon, star, bowl, cat, butterfly, heart, eye
      artStyle: options.artStyle || 'standard', // standard, wave, fibonacci, sakura
      color: options.color || '#111827',
      bgColor: options.bgColor || '#ffffff',
      errorCorrection: options.errorCorrection || 'H' // L, M, Q, H
    };

    // Ensure size is set properly
    this.canvas.width = this.options.size;
    this.canvas.height = this.options.size;

    this.generateMatrix();
    this.render();
  }

  generateMatrix() {
    // Requires qrcode-generator library
    const typeNumber = 0; // Auto detect
    const qr = qrcode(typeNumber, this.options.errorCorrection);
    qr.addData(this.data);
    qr.make();
    
    this.moduleCount = qr.getModuleCount();
    this.matrix = [];
    
    for (let r = 0; r < this.moduleCount; r++) {
      this.matrix[r] = [];
      for (let c = 0; c < this.moduleCount; c++) {
        this.matrix[r][c] = qr.isDark(r, c);
      }
    }
  }

  isPositionDetectionPattern(r, c) {
    const mc = this.moduleCount;
    // Outer 7x7 boundaries
    const isTopLeft = r < 7 && c < 7;
    const isTopRight = r < 7 && c >= mc - 7;
    const isBottomLeft = r >= mc - 7 && c < 7;
    return isTopLeft || isTopRight || isBottomLeft;
  }

  isPositionCenter(r, c) {
    // Return true if it's the center dot/block of a finder pattern
    const mc = this.moduleCount;
    const isTopLeftCenter = r >= 2 && r <= 4 && c >= 2 && c <= 4;
    const isTopRightCenter = r >= 2 && r <= 4 && c >= mc - 5 && c <= mc - 3;
    const isBottomLeftCenter = r >= mc - 5 && r <= mc - 3 && c >= 2 && c <= 4;
    return isTopLeftCenter || isTopRightCenter || isBottomLeftCenter;
  }

  drawStencilBackground() {
    const size = this.canvas.width;
    const cx = size / 2;
    const cy = size / 2;
    const shape = this.options.shape;

    this.ctx.save();
    
    // Smooth outline drawing style
    this.ctx.lineWidth = 4;
    this.ctx.strokeStyle = this.options.color;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    if (shape === 'bowl') {
      // Draw Food Bowl & Rising Steam (Reference Image 1)
      this.ctx.strokeStyle = '#78350F'; // warm brown menu tone
      
      // 1. Steam rising (3 curvy lines above)
      this.ctx.beginPath();
      for (let i = -1; i <= 1; i++) {
        const sx = cx + i * 36;
        const sy = cy - size * 0.44;
        this.ctx.moveTo(sx, sy);
        this.ctx.bezierCurveTo(sx - 10, sy - 15, sx + 10, sy - 30, sx, sy - 45);
      }
      this.ctx.stroke();

      // 2. Main Bowl Outline at the bottom
      this.ctx.beginPath();
      // Draw a sleek wide bowl that frames the lower half
      this.ctx.moveTo(cx - size * 0.45, cy + size * 0.1);
      this.ctx.bezierCurveTo(
        cx - size * 0.45, cy + size * 0.45, 
        cx + size * 0.45, cy + size * 0.45, 
        cx + size * 0.45, cy + size * 0.1
      );
      this.ctx.lineTo(cx + size * 0.48, cy + size * 0.1);
      this.ctx.lineTo(cx - size * 0.48, cy + size * 0.1);
      this.ctx.closePath();
      
      // Light fill for artistic styling
      this.ctx.fillStyle = 'rgba(120, 53, 15, 0.04)';
      this.ctx.fill();
      this.ctx.stroke();

      // Flat base stand
      this.ctx.beginPath();
      this.ctx.moveTo(cx - size * 0.18, cy + size * 0.43);
      this.ctx.lineTo(cx + size * 0.18, cy + size * 0.43);
      this.ctx.lineTo(cx + size * 0.14, cy + size * 0.47);
      this.ctx.lineTo(cx - size * 0.14, cy + size * 0.47);
      this.ctx.closePath();
      this.ctx.fillStyle = '#78350F';
      this.ctx.fill();

    } else if (shape === 'cat') {
      // Draw Cute Cat Silhouette (Reference Image 5)
      this.ctx.strokeStyle = '#1E293B'; // dark slate
      this.ctx.fillStyle = 'rgba(30, 41, 59, 0.03)';
      
      // Ears + Head Outer contour framing the upper area
      this.ctx.beginPath();
      this.ctx.moveTo(cx - size * 0.45, cy);
      // Left Ear
      this.ctx.lineTo(cx - size * 0.4, cy - size * 0.45);
      this.ctx.lineTo(cx - size * 0.15, cy - size * 0.25);
      // Top Head curve
      this.ctx.quadraticCurveTo(cx, cy - size * 0.28, cx + size * 0.15, cy - size * 0.25);
      // Right Ear
      this.ctx.lineTo(cx + size * 0.4, cy - size * 0.45);
      this.ctx.lineTo(cx + size * 0.45, cy);
      
      // Body & Tail curve
      this.ctx.bezierCurveTo(cx + size * 0.52, cy + size * 0.35, cx + size * 0.35, cy + size * 0.48, cx, cy + size * 0.48);
      this.ctx.bezierCurveTo(cx - size * 0.35, cy + size * 0.48, cx - size * 0.52, cy + size * 0.35, cx - size * 0.45, cy);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();

      // Tail
      this.ctx.beginPath();
      this.ctx.moveTo(cx + size * 0.35, cy + size * 0.35);
      this.ctx.bezierCurveTo(cx + size * 0.48, cy + size * 0.2, cx + size * 0.48, cy + size * 0.05, cx + size * 0.43, cy);
      this.ctx.bezierCurveTo(cx + size * 0.4, cy + size * 0.1, cx + size * 0.38, cy + size * 0.25, cx + size * 0.32, cy + size * 0.32);
      this.ctx.fillStyle = '#1E293B';
      this.ctx.fill();

    } else if (shape === 'butterfly') {
      // Draw Artistic Butterfly (Reference Image 9)
      const gradient = this.ctx.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, '#2563EB');
      gradient.addColorStop(1, '#DB2777');
      this.ctx.strokeStyle = gradient;
      this.ctx.fillStyle = 'rgba(219, 39, 119, 0.03)';

      this.ctx.beginPath();
      // Left wings
      this.ctx.moveTo(cx, cy);
      this.ctx.bezierCurveTo(cx - size*0.48, cy - size*0.48, cx - size*0.52, cy + size*0.05, cx, cy);
      this.ctx.bezierCurveTo(cx - size*0.35, cy + size*0.45, cx - size*0.42, cy + size*0.15, cx, cy);
      
      // Right wings
      this.ctx.bezierCurveTo(cx + size*0.48, cy - size*0.48, cx + size*0.52, cy + size*0.05, cx, cy);
      this.ctx.bezierCurveTo(cx + size*0.35, cy + size*0.45, cx + size*0.42, cy + size*0.15, cx, cy);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();

      // Antennae
      this.ctx.beginPath();
      this.ctx.moveTo(cx, cy - size*0.2);
      this.ctx.bezierCurveTo(cx - 10, cy - size*0.35, cx - 25, cy - size*0.4, cx - 25, cy - size*0.43);
      this.ctx.moveTo(cx, cy - size*0.2);
      this.ctx.bezierCurveTo(cx + 10, cy - size*0.35, cx + 25, cy - size*0.4, cx + 25, cy - size*0.43);
      this.ctx.stroke();

    } else if (shape === 'heart') {
      // Draw Love Heart Silhouette (Reference Image 4)
      this.ctx.strokeStyle = '#DC2626'; // Red
      this.ctx.fillStyle = 'rgba(220, 38, 38, 0.04)';
      
      this.ctx.beginPath();
      const topY = cy - size * 0.42;
      this.ctx.moveTo(cx, cy + size * 0.44);
      this.ctx.bezierCurveTo(cx - size * 0.55, cy + size * 0.15, cx - size * 0.55, topY, cx, topY + size * 0.15);
      this.ctx.bezierCurveTo(cx + size * 0.55, topY, cx + size * 0.55, cy + size * 0.15, cx, cy + size * 0.44);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();

    } else if (shape === 'eye') {
      // Draw Human Eye Contour (Reference Image 7)
      this.ctx.strokeStyle = '#0891B2'; // Cyan/Teal
      this.ctx.fillStyle = 'rgba(8, 145, 178, 0.03)';
      
      this.ctx.beginPath();
      // Upper lid
      this.ctx.moveTo(cx - size * 0.48, cy);
      this.ctx.quadraticCurveTo(cx, cy - size * 0.42, cx + size * 0.48, cy);
      // Lower lid
      this.ctx.quadraticCurveTo(cx, cy + size * 0.42, cx - size * 0.48, cy);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();

      // Outer Iris ring
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, size * 0.22, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(8, 145, 178, 0.08)';
      this.ctx.fill();
      this.ctx.stroke();
    }

    this.ctx.restore();
  }

  render() {
    // Clear and background fill
    if (this.options.bgColor !== 'transparent') {
      this.ctx.fillStyle = this.options.bgColor;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Step 1: Draw the spectacular artistic stencil background behind the QR
    const hasArtStencil = ['bowl', 'cat', 'butterfly', 'heart', 'eye'].includes(this.options.shape);
    if (hasArtStencil) {
      this.drawStencilBackground();
    }

    const moduleSize = this.canvas.width / (this.moduleCount + this.options.margin * 2);
    const offset = this.options.margin * moduleSize;

    // Default primary fill style
    this.ctx.fillStyle = this.options.color;

    for (let r = 0; r < this.moduleCount; r++) {
      for (let c = 0; c < this.moduleCount; c++) {
        if (!this.matrix[r][c]) continue;

        const x = offset + c * moduleSize;
        const y = offset + r * moduleSize;
        const cx = x + moduleSize / 2;
        const cy = y + moduleSize / 2;

        let drawX = cx;
        let drawY = cy;

        // Apply Art Style transformations
        if (this.options.artStyle === 'wave') {
          const waveDist = Math.sin((c + r) * 0.5) * (moduleSize * 0.18);
          drawY += waveDist;
        }

        // --- CUSTOM POSITION DETECTION PATTERN (FINDER PATTERNS) OVERRIDES ---
        if (this.isPositionDetectionPattern(r, c)) {
          // Skip individual module rendering since we draw beautiful unified vector shapes for finder patterns!
          continue;
        }

        // --- STANDARD MODULES RENDERING ---
        this.ctx.beginPath();
        const radius = (moduleSize / 2) * 0.88;

        this.ctx.save();
        this.ctx.fillStyle = this.options.color;

        // Color theme adaptations for artistic shapes
        if (this.options.shape === 'bowl') {
          this.ctx.fillStyle = '#78350F'; // Coffee bowl brown modules
        } else if (this.options.shape === 'cat') {
          this.ctx.fillStyle = '#1E293B'; // Slate dark modules
        } else if (this.options.shape === 'heart') {
          this.ctx.fillStyle = '#DC2626'; // Red heart modules
        } else if (this.options.shape === 'eye') {
          this.ctx.fillStyle = '#0F766E'; // Deep teal modules
        }

        switch (this.options.shape) {
          case 'circle':
            this.drawCircle(drawX, drawY, radius);
            break;
          case 'diamond':
            this.drawDiamond(drawX, drawY, radius);
            break;
          case 'hexagon':
            this.drawHexagon(drawX, drawY, radius);
            break;
          case 'star':
            this.drawStar(drawX, drawY, 5, radius, radius * 0.4);
            break;
          case 'sakura':
            this.drawPetal(drawX, drawY, radius);
            break;
          case 'lotus':
            this.drawLotus(drawX, drawY, radius);
            break;
          case 'mandala':
            this.drawMandala(drawX, drawY, radius);
            break;
          case 'arabic':
            this.drawArabic(drawX, drawY, radius);
            break;
          case 'vinyl':
            this.drawCircle(drawX, drawY, radius * 0.8);
            break;
          case 'bowl':
            // Draw cute micro-hexagons or mini steam circles
            this.drawHexagon(drawX, drawY, radius * 0.9);
            break;
          case 'cat':
            // Draw mini dots with soft spacing
            this.drawCircle(drawX, drawY, radius * 0.8);
            break;
          case 'butterfly':
            // Draw mini diamonds for an organic look
            this.drawDiamond(drawX, drawY, radius * 0.85);
            break;
          case 'heart':
            // Draw mini hearts (Reference Image 4)
            this.drawHeart(drawX, drawY, radius * 0.95);
            break;
          case 'eye':
            // Draw mini circles/iris rings
            this.drawCircle(drawX, drawY, radius * 0.82);
            break;
          default:
            // Standard rectangle
            this.ctx.rect(drawX - radius, drawY - radius, radius*2, radius*2);
        }
        this.ctx.fill();
        this.ctx.restore();
      }
    }

    // Step 3: Draw continuous, high-fidelity vector finder pattern shapes at the corners
    this.drawUnifiedFinderPatterns(moduleSize, offset);
  }

  drawUnifiedFinderPatterns(moduleSize, offset) {
    const mc = this.moduleCount;
    // The three finder pattern centers
    const corners = [
      // Top-Left center
      { cx: offset + 3.5 * moduleSize, cy: offset + 3.5 * moduleSize },
      // Top-Right center
      { cx: offset + (mc - 3.5) * moduleSize, cy: offset + 3.5 * moduleSize },
      // Bottom-Left center
      { cx: offset + 3.5 * moduleSize, cy: offset + (mc - 3.5) * moduleSize }
    ];

    const R = 3.5 * moduleSize;
    const shape = this.options.shape;

    corners.forEach(corner => {
      const { cx, cy } = corner;
      this.ctx.save();

      // Outer color, inner background color, center core color
      let outerColor = this.options.color;
      let innerColor = this.options.bgColor === 'transparent' ? '#ffffff' : this.options.bgColor;
      let coreColor = this.options.color;

      if (shape === 'bowl') {
        outerColor = '#78350F'; // warm brown bowl
        coreColor = '#DC2626';  // bright red soup core
      } else if (shape === 'cat') {
        outerColor = '#1E293B'; // dark slate cat head
        coreColor = '#1E293B';
      } else if (shape === 'heart') {
        outerColor = '#DC2626'; // Red outer heart
        coreColor = '#BE123C';  // Deep red core
      } else if (shape === 'eye') {
        outerColor = '#0891B2'; // Cyan outer eye
        coreColor = '#0E7490';  // Deep cyan iris pupil
      } else if (shape === 'butterfly') {
        outerColor = '#7C3AED'; // Violet outer
        coreColor = '#6D28D9';  // Inner core
      }

      this.ctx.fillStyle = outerColor;

      // Draw the Outer Shape
      this.ctx.beginPath();
      if (shape === 'bowl') {
        this.drawBowl(cx, cy, R);
      } else if (shape === 'cat') {
        this.drawCat(cx, cy, R);
      } else if (shape === 'heart') {
        this.drawHeart(cx, cy, R);
      } else if (shape === 'eye') {
        this.drawEye(cx, cy, R);
      } else if (shape === 'butterfly') {
        this.drawButterfly(cx, cy, R);
      } else if (shape === 'circle') {
        this.drawCircle(cx, cy, R);
      } else if (shape === 'hexagon') {
        this.drawHexagon(cx, cy, R);
      } else if (shape === 'diamond') {
        this.drawDiamond(cx, cy, R);
      } else {
        // Rounded Square finder pattern
        this.drawRoundedRectPath(cx - R, cy - R, 2 * R, 2 * R, R * 0.35);
      }
      this.ctx.fill();

      // Draw the Inner Cutout (Middle empty area of 5x5 modules)
      const R_mid = R - 1 * moduleSize;
      this.ctx.fillStyle = innerColor;
      this.ctx.beginPath();
      if (shape === 'bowl') {
        this.drawBowl(cx, cy, R_mid);
      } else if (shape === 'cat') {
        this.drawCat(cx, cy, R_mid);
      } else if (shape === 'heart') {
        this.drawHeart(cx, cy, R_mid);
      } else if (shape === 'eye') {
        this.drawEye(cx, cy, R_mid);
      } else if (shape === 'butterfly') {
        this.drawButterfly(cx, cy, R_mid);
      } else if (shape === 'circle') {
        this.drawCircle(cx, cy, R_mid);
      } else if (shape === 'hexagon') {
        this.drawHexagon(cx, cy, R_mid);
      } else if (shape === 'diamond') {
        this.drawDiamond(cx, cy, R_mid);
      } else {
        this.drawRoundedRectPath(cx - R_mid, cy - R_mid, 2 * R_mid, 2 * R_mid, R_mid * 0.35);
      }
      this.ctx.fill();

      // Draw the Solid Center Core (Inner 3x3 modules)
      const R_core = R - 2 * moduleSize;
      this.ctx.fillStyle = coreColor;
      this.ctx.beginPath();
      if (shape === 'bowl') {
        this.drawBowl(cx, cy, R_core);
      } else if (shape === 'cat') {
        this.drawCat(cx, cy, R_core);
      } else if (shape === 'heart') {
        this.drawHeart(cx, cy, R_core);
      } else if (shape === 'eye') {
        this.drawEye(cx, cy, R_core);
      } else if (shape === 'butterfly') {
        this.drawButterfly(cx, cy, R_core);
      } else if (shape === 'circle') {
        this.drawCircle(cx, cy, R_core);
      } else if (shape === 'hexagon') {
        this.drawHexagon(cx, cy, R_core);
      } else if (shape === 'diamond') {
        this.drawDiamond(cx, cy, R_core);
      } else {
        this.drawRoundedRectPath(cx - R_core, cy - R_core, 2 * R_core, 2 * R_core, R_core * 0.35);
      }
      this.ctx.fill();

      this.ctx.restore();
    });
  }

  drawRoundedRectPath(x, y, w, h, r) {
    if (typeof this.ctx.roundRect === 'function') {
      this.ctx.roundRect(x, y, w, h, r);
    } else {
      this.ctx.moveTo(x + r, y);
      this.ctx.lineTo(x + w - r, y);
      this.ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      this.ctx.lineTo(x + w, y + h - r);
      this.ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      this.ctx.lineTo(x + r, y + h - r);
      this.ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      this.ctx.lineTo(x, y + r);
      this.ctx.quadraticCurveTo(x, y, x + r, y);
      this.ctx.closePath();
    }
  }

  drawCircle(cx, cy, r) {
    this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
  }

  drawDiamond(cx, cy, r) {
    this.ctx.moveTo(cx, cy - r);
    this.ctx.lineTo(cx + r, cy);
    this.ctx.lineTo(cx, cy + r);
    this.ctx.lineTo(cx - r, cy);
    this.ctx.closePath();
  }

  drawHexagon(cx, cy, r) {
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      if (i === 0) this.ctx.moveTo(x, y);
      else this.ctx.lineTo(x, y);
    }
    this.ctx.closePath();
  }

  drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    this.ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      this.ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      this.ctx.lineTo(x, y);
      rot += step;
    }
    this.ctx.lineTo(cx, cy - outerRadius);
    this.ctx.closePath();
  }

  drawPetal(cx, cy, r) {
    this.ctx.moveTo(cx, cy + r);
    this.ctx.quadraticCurveTo(cx + r, cy + r, cx + r, cy - r * 0.2);
    this.ctx.lineTo(cx, cy - r);
    this.ctx.lineTo(cx - r, cy - r * 0.2);
    this.ctx.quadraticCurveTo(cx - r, cy + r, cx, cy + r);
    this.ctx.closePath();
  }

  drawLotus(cx, cy, r) {
    this.ctx.moveTo(cx, cy - r);
    this.ctx.quadraticCurveTo(cx + r, cy - r*0.5, cx + r, cy);
    this.ctx.quadraticCurveTo(cx + r, cy + r, cx, cy + r);
    this.ctx.quadraticCurveTo(cx - r, cy + r, cx - r, cy);
    this.ctx.quadraticCurveTo(cx - r, cy - r*0.5, cx, cy - r);
    this.ctx.closePath();
  }

  drawMandala(cx, cy, r) {
    this.drawStar(cx, cy, 8, r, r * 0.6);
  }

  drawArabic(cx, cy, r) {
    this.drawStar(cx, cy, 8, r, r * 0.7);
  }

  drawBowl(cx, cy, r) {
    this.ctx.moveTo(cx - r, cy - r*0.3);
    this.ctx.bezierCurveTo(cx - r, cy + r, cx + r, cy + r, cx + r, cy - r*0.3);
    this.ctx.lineTo(cx + r * 1.1, cy - r * 0.4);
    this.ctx.lineTo(cx - r * 1.1, cy - r * 0.4);
    this.ctx.closePath();
  }

  drawCat(cx, cy, r) {
    this.ctx.moveTo(cx - r, cy + r * 0.3);
    this.ctx.lineTo(cx - r * 0.8, cy - r * 0.8);
    this.ctx.lineTo(cx - r * 0.3, cy - r * 0.3);
    this.ctx.lineTo(cx + r * 0.3, cy - r * 0.3);
    this.ctx.lineTo(cx + r * 0.8, cy - r * 0.8);
    this.ctx.lineTo(cx + r, cy + r * 0.3);
    this.ctx.bezierCurveTo(cx + r, cy + r, cx - r, cy + r, cx - r, cy + r * 0.3);
    this.ctx.closePath();
  }

  drawButterfly(cx, cy, r) {
    this.ctx.moveTo(cx, cy);
    this.ctx.bezierCurveTo(cx + r * 1.2, cy - r * 1.2, cx + r * 1.5, cy + r * 0.3, cx, cy);
    this.ctx.bezierCurveTo(cx + r * 0.8, cy + r * 1.2, cx + r * 1.2, cy + r * 0.5, cx, cy);
    this.ctx.bezierCurveTo(cx - r * 1.2, cy - r * 1.2, cx - r * 1.5, cy + r * 0.3, cx, cy);
    this.ctx.bezierCurveTo(cx - r * 0.8, cy + r * 1.2, cx - r * 1.2, cy + r * 0.5, cx, cy);
    this.ctx.closePath();
  }

  drawHeart(cx, cy, r) {
    this.ctx.moveTo(cx, cy - r * 0.2);
    this.ctx.bezierCurveTo(cx - r * 1.3, cy - r * 1.3, cx - r * 1.5, cy + r * 0.2, cx, cy + r * 1.1);
    this.ctx.bezierCurveTo(cx + r * 1.5, cy + r * 0.2, cx + r * 1.3, cy - r * 1.3, cx, cy - r * 0.2);
    this.ctx.closePath();
  }

  drawEye(cx, cy, r) {
    this.ctx.moveTo(cx - r, cy);
    this.ctx.quadraticCurveTo(cx, cy - r * 0.8, cx + r, cy);
    this.ctx.quadraticCurveTo(cx, cy + r * 0.8, cx - r, cy);
    this.ctx.closePath();
    this.ctx.moveTo(cx + r * 0.4, cy);
    this.ctx.arc(cx, cy, r * 0.4, 0, Math.PI * 2);
    this.ctx.closePath();
  }
}

window.ArtQREngine = ArtQREngine;
