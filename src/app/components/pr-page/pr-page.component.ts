import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ScreenLayoutService } from 'src/app/utils/screen-layout/screen-layout.service';

@Component({
  selector: 'app-pr-page',
  templateUrl: './pr-page.component.html',
  styleUrls: ['./pr-page.component.scss'],
})
export class PrPageComponent implements AfterViewInit {
  isMobile$: Observable<boolean>;

  @ViewChild('mobileSticky', { static: false }) mobileSticky!: ElementRef;
  private lastScroll = 0;
  private anchorY = 0;
  private initialized = false;

  constructor(private screenLayoutService: ScreenLayoutService) {
    this.isMobile$ = this.screenLayoutService.isMobile$;
  }

  ngAfterViewInit() {
    this.updateStickyPosition();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.updateStickyPosition();
  }

  private updateStickyPosition() {
    if (!this.mobileSticky) return;

    const el = this.mobileSticky.nativeElement;
    const scrollY = window.scrollY;
    const isScrollingDown = scrollY > this.lastScroll;

    // Initialize anchor on first scroll
    if (!this.initialized) {
      this.anchorY = el.getBoundingClientRect().top + scrollY;
      this.initialized = true;
    }

    // Scrolling DOWN → attach at anchor
    if (isScrollingDown && scrollY > this.anchorY) {
      el.style.position = 'fixed';
      el.style.top = '0';
    }

    // Scrolling UP → release back to anchor
    else if (!isScrollingDown && scrollY < this.anchorY) {
      el.style.position = 'relative';
      el.style.top = '';
    }

    this.lastScroll = scrollY;
  }

  testimonialsArray = [
    {
      text: 'Soll helped me stay consistent with my savings for the first time.',
      author: 'Marie P.',
    },
    {
      text: 'The rotating payouts came exactly when I needed them the most.',
      author: 'Jean R.',
    },
    {
      text: 'Simple, transparent, and community-centered. Love using Soll!',
      author: 'Sofia D.',
    },
    {
      text: 'A modern take on a classic savings system. Truly innovative.',
      author: 'Daniel K.',
    },
  ];
}
