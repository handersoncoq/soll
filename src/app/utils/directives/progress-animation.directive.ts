import { Directive, ElementRef, Input, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appProgressAnimation]'
})
export class ProgressAnimationDirective implements AfterViewInit {
  @Input() rank!: number;
  @Input() groupSize!: number;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    
    if(!this.rank || !this.groupSize) return;
    
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
    const width = this.rank / this.groupSize * 100 + '%';
    this.renderer.setStyle(this.el.nativeElement, 'width', width);
  }

  resetProgressBar() {
    this.renderer.setStyle(this.el.nativeElement, 'width', '0%');
  }
}