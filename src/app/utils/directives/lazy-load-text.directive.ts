import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appLazyLoadText]'
})
export class LazyLoadTextDirective implements AfterViewInit, OnDestroy {
  private observer!: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.el.nativeElement.classList.add('visible');
        } else {
          this.el.nativeElement.classList.remove('visible');
        }
      });
    }, { threshold: 0.1 });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}