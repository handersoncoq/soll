import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appLazyLoading]'
})
export class LazyLoadingDirective {

  constructor(private el: ElementRef<HTMLImageElement>) {}

  @HostListener('load')
  onLoad() {
    this.el.nativeElement.classList.add('loaded');
  }

}
