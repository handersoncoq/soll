import { Directive, Input, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Directive({
  selector: '[appScrollToSection]'
})
export class ScrollToSectionDirective implements AfterViewInit, OnDestroy {
  @Input() appScrollToSection!: string;
  private observer!: IntersectionObserver;

  constructor(private el: ElementRef, private router: Router) {}

  ngAfterViewInit(): void {
    this.router.events.pipe(
      filter((event: Event) => event instanceof NavigationEnd)
    ).subscribe(() => {
      setTimeout(() => {
        this.initObserver();
      }, 500);
    });
  }

  private initObserver(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id === this.appScrollToSection) {
          entry.target.scrollIntoView({ behavior: 'smooth' });
          this.observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1
    });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}