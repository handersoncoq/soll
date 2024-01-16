import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStickyScroll]'
})
export class StickyScrollDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 10) {
      this.renderer.setStyle(this.el.nativeElement, 'position', 'sticky');
      this.renderer.setStyle(this.el.nativeElement, 'top', '8em');
      this.renderer.setStyle(this.el.nativeElement, 'z-index', '-1');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'position');
      this.renderer.setStyle(this.el.nativeElement, 'top', '7em');
      this.renderer.removeStyle(this.el.nativeElement, 'z-index');
    }

    if(scrollPosition > 100){
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
    }else this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
  }

}
