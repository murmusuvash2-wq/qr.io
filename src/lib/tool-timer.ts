// ═══════════════════════════════════════════════════════════════════
//  TOOL TIMER — Track "under 30 seconds" promise
//  Measures from first input to QR generation
// ═══════════════════════════════════════════════════════════════════

export class ToolTimer {
  private startTime: number = 0;
  private currentStep: string = '';
  private stepTimes: { step: string; duration: number }[] = [];
  private warningThreshold = 25; // warn at 25 seconds
  private onWarning?: () => void;
  private onComplete?: (totalTime: number) => void;

  start() {
    this.startTime = Date.now();
    this.stepTimes = [];
    this.currentStep = 'required';
  }

  markStep(step: 'required' | 'optional' | 'preview' | 'download') {
    const now = Date.now();
    if (this.currentStep) {
      this.stepTimes.push({
        step: this.currentStep,
        duration: now - this.startTime - this.stepTimes.reduce((a, s) => a + s.duration, 0)
      });
    }
    this.currentStep = step;
  }

  getElapsed(): number {
    return (Date.now() - this.startTime) / 1000;
  }

  isUnder30(): boolean {
    return this.getElapsed() <= 30;
  }

  getProgress(): { step: string; progress: number; timeLeft: number } {
    const elapsed = this.getElapsed();
    return {
      step: this.currentStep,
      progress: Math.min(100, (elapsed / 30) * 100),
      timeLeft: Math.max(0, 30 - elapsed)
    };
  }

  // Call this on "Generate" button
  checkAndWarn() {
    const elapsed = this.getElapsed();
    if (elapsed >= this.warningThreshold && this.onWarning) {
      this.onWarning();
    }
  }

  complete() {
    this.markStep('download' as any);
    const total = this.getElapsed();
    if (this.onComplete) this.onComplete(total);
    return total;
  }
}
