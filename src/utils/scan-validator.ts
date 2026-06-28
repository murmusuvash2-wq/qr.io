/**
 * Scan Validation Utility
 * Uses the Web Barcode Detection API (available in Chrome, Edge, Samsung)
 * Falls back to visual instructions for other browsers
 */

export interface ScanResult {
  success: boolean;
  rawValue: string | null;
  method: 'barcode-detector' | 'manual';
  error?: string;
}

/**
 * Validate QR by detecting it in the DOM using BarcodeDetector API
 */
export async function validateQRScan(canvas: HTMLCanvasElement): Promise<ScanResult> {
  // Method 1: Native BarcodeDetector API
  if ('BarcodeDetector' in window) {
    try {
      const detector = new (window as any).BarcodeDetector({
        formats: ['qr_code'],
      });
      
      const detections = await detector.detect(canvas);
      
      if (detections.length > 0) {
        const rawValue = detections[0].rawValue;
        return { 
          success: true, 
          rawValue, 
          method: 'barcode-detector',
        };
      } else {
        return { 
          success: false, 
          rawValue: null, 
          method: 'barcode-detector',
          error: 'No QR code detected. Try increasing contrast or reducing data size.' 
        };
      }
    } catch (e: any) {
      return { success: false, rawValue: null, method: 'barcode-detector', error: e.message };
    }
  }
  
  // Method 2: Not available — return manual instructions
  return {
    success: false,
    rawValue: null,
    method: 'manual',
    error: 'BarcodeDetector API not available in this browser. Please test with your phone camera.',
  };
}

/**
 * Return a quality score for the QR code (0-100)
 */
export function getQRQualityScore(qrString: string, errorLevel: string): {
  score: number;
  label: string;
  color: string;
  issues: string[];
} {
  const issues: string[] = [];
  let score = 100;
  
  // Data length check
  const len = qrString.length;
  if (len > 4296) {
    issues.push(`Data too long (${len} chars). Max for version 40 at L-level is 4296.`);
    score -= 40;
  } else if (len > 1000) {
    issues.push(`Large data (${len} chars). Consider using a URL instead.`);
    score -= 15;
  }
  
  // Error correction check
  if (errorLevel === 'L') {
    issues.push('Low error correction. Not suitable for small prints.');
    score -= 10;
  }
  
  // Special characters check
  // eslint-disable-next-line no-control-regex
  if (/[^\x00-\x7F]/.test(qrString)) {
    issues.push('Contains Unicode characters. Ensure scanner supports UTF-8.');
    score -= 5;
  }
  
  // Whitespace check
  if (qrString.startsWith(' ') || qrString.endsWith(' ')) {
    issues.push('Leading/trailing whitespace detected. This may cause scan failures.');
    score -= 15;
  }
  
  let label: string, color: string;
  if (score >= 90) {
    label = 'Excellent';
    color = 'var(--ez-success)';
  } else if (score >= 70) {
    label = 'Good';
    color = 'var(--ez-warning)';
  } else {
    label = 'Poor';
    color = 'var(--ez-error)';
  }
  
  return { score, label, color, issues };
}
