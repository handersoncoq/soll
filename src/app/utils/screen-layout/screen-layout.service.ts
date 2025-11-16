import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenLayoutService {
  isMobile$: Observable<boolean>;
  isTablet$: Observable<boolean>;
  isDesktop$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    // MOBILE: < 768px
    this.isMobile$ = this.breakpointObserver
      .observe(['(max-width: 767px)'])
      .pipe(map((result) => result.matches));

    // TABLET: 768px – 1023px
    this.isTablet$ = this.breakpointObserver
      .observe(['(min-width: 768px) and (max-width: 1023px)'])
      .pipe(map((result) => result.matches));

    // DESKTOP: ≥ 1024px
    this.isDesktop$ = this.breakpointObserver
      .observe(['(min-width: 1024px)'])
      .pipe(map((result) => result.matches));
  }
}
