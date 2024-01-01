import { Directive, ElementRef, Input, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appProgressAnimation]'
})
export class ProgressAnimationDirective implements AfterViewInit {
  @Input() startDate!: Date;
  @Input() endDate!: Date;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    if (!this.startDate || !this.endDate) return;

    const options = {
      root: null,
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateProgressBar();
        } else {
          this.resetProgressBar();
        }
      });
    }, options);

    observer.observe(this.el.nativeElement);
  }

  animateProgressBar() {
    const progress = this.calculateProgress();
    const width = progress + '%';
    this.renderer.setStyle(this.el.nativeElement, 'width', width);
  }

  calculateProgress(): number {
    const start = new Date(this.startDate).getTime();
    const end = new Date(this.endDate).getTime();
    const now = new Date().getTime();

    if (now < start) return 0;
    if (now > end) return 100;

    const totalDuration = end - start;
    const elapsedDuration = now - start;
    return (elapsedDuration / totalDuration) * 100;
  }

  resetProgressBar() {
    this.renderer.setStyle(this.el.nativeElement, 'width', '0%');
  }
}