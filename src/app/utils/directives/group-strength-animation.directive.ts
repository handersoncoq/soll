import { Directive, ElementRef, Input, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appGroupStrengthAnimation]'
})
export class GroupStrengthAnimationDirective implements AfterViewInit {
  @Input() targetHeight!: number;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateBatteryFill();
        } else this.resetFill()
      });
    }, options);

    observer.observe(this.el.nativeElement);
  }

  animateBatteryFill() {
    const height = this.targetHeight * 100 + '%';
    this.renderer.setStyle(this.el.nativeElement, 'height', height);
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'height 2s');
  }

  resetFill() {
    this.renderer.setStyle(this.el.nativeElement, 'height', '0%');
  }

}