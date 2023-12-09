import { Directive, ElementRef, Input, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appLazyVideo]'
})
export class LazyVideoDirective implements AfterViewInit, OnDestroy {
  @Input() appLazyVideo!: string;
  private observer!: IntersectionObserver;

  constructor(private el: ElementRef<HTMLVideoElement>) {}

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadAndPlayVideo();
        }
      });
    }, { threshold: 0.5 });

    this.observer.observe(this.el.nativeElement);
  }

  private loadAndPlayVideo() {
    const videoElement: HTMLVideoElement = this.el.nativeElement;
    videoElement.src = this.appLazyVideo;
    videoElement.muted = true;
    videoElement.play().catch(e => {
      console.info("Error attempting to play video: ", e);
    });
    this.observer.disconnect();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}