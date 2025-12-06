import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenLayoutService {
  isMobile$: Observable<boolean>;
  isDesktop$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    // MOBILE → small width + portrait orientation
    this.isMobile$ = this.breakpointObserver
      .observe(['(max-width: 700px)'])
      .pipe(
        map((result) => {
          const isSmallWidth = result.matches;
          return isSmallWidth;
        })
      );

    // DESKTOP → anything that is NOT mobile
    this.isDesktop$ = this.isMobile$.pipe(map((isMobile) => !isMobile));
  }
}
