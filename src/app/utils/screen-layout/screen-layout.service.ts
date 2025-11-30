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
  isLandscape$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isLandscape$ = this.breakpointObserver
      .observe(['(orientation: landscape)'])
      .pipe(map((result) => result.matches));

    this.isMobile$ = this.breakpointObserver
      .observe(['(max-width: 767px)'])
      .pipe(
        map((result) => result.matches),
        map(
          (isMobileWidth) =>
            isMobileWidth &&
            !this.breakpointObserver.isMatched('(orientation: landscape)')
        )
      );

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
