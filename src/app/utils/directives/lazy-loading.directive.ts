import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appLazyLoading]'
})
export class LazyLoadingDirective implements AfterViewInit, OnDestroy {
  private observer!: IntersectionObserver;
  private mutationObserver!: MutationObserver;

  constructor(private el: ElementRef<HTMLImageElement>) {}

  ngAfterViewInit() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.loadImage();
        } else {
          this.unloadImage();
        }
      });
    }, { threshold: 0.1 });

    this.observer.observe(this.el.nativeElement);

    this.mutationObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'data-src') {
          this.loadImage();
        }
      });
    });
    this.mutationObserver.observe(this.el.nativeElement, { attributes: true });
  }

  loadImage() {
    const imageElement: HTMLImageElement = this.el.nativeElement;
    const src = imageElement.getAttribute('data-src');
    if (src && imageElement.src !== src) {
      imageElement.src = src;
      imageElement.onload = () => imageElement.classList.add('loaded');
    }
  }

  unloadImage() {
    const imageElement: HTMLImageElement = this.el.nativeElement;
    imageElement.classList.remove('loaded');
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }
}
