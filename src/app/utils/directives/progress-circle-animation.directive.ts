import { Directive, ElementRef, Renderer2, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appProgressCircleAnimation]'
})
export class ProgressCircleAnimationDirective implements AfterViewInit {
  @Input() nextPayoutDate!: Date;
  @Input() cycleStartDate!: Date;
  @Input() fillColor: string = '#20a7db';
  @Output() daysUntilPayoutChange = new EventEmitter<number>();

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCircleFill();
        } else {
          this.resetCircleFill();
        }
      });
    }, { threshold: 0.1 });

    observer.observe(this.el.nativeElement);
  }

  animateCircleFill(): void {
    const fillPercentage = this.calculateFillPercentage();
    let currentFill = 0;
    const increment = 0.5;
    const intervalTime = 10;

    const fillInterval = setInterval(() => {
      if (currentFill < fillPercentage) {
        currentFill += increment;
        this.updateCircleFill(currentFill);
      } else {
        clearInterval(fillInterval);
      }
    }, intervalTime);
  }

  calculateFillPercentage(): number {
    const currentTime = new Date().getTime();
    const payoutTime = this.nextPayoutDate.getTime();
    const cycleStartTime = this.cycleStartDate.getTime();

    const timeDiff = payoutTime - currentTime;
    const daysUntilPayout = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    this.daysUntilPayoutChange.emit(daysUntilPayout);

    const totalCycleTime = payoutTime - cycleStartTime;
    const elapsedCycleTime = currentTime - cycleStartTime;

    return Math.max(0, (elapsedCycleTime / totalCycleTime) * 100);
  }

  updateCircleFill(currentFill: number): void {
    this.renderer.setStyle(
      this.el.nativeElement,
      'background',
      `conic-gradient(${this.fillColor} ${currentFill}%, #ddd ${currentFill}%)`
    );
  }

  resetCircleFill(): void {
    this.renderer.setStyle(this.el.nativeElement, 'background', 'transparent');
  }
}