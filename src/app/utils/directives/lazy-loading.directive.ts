import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appLazyLoading]'
})
export class LazyLoadingDirective implements AfterViewInit, OnDestroy {
  private observer!: IntersectionObserver;

  constructor(private el: ElementRef<HTMLImageElement>) {}

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage();
        }
      });
    }, { threshold: 0.5 });

    this.observer.observe(this.el.nativeElement);
  }

  private loadImage() {
    const imageElement: HTMLImageElement = this.el.nativeElement;
    const src = imageElement.getAttribute('data-src');
    if (src) {
      imageElement.src = src;
      imageElement.onload = () => imageElement.classList.add('loaded');
    }
    this.observer.disconnect();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
