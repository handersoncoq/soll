import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenLayoutService {

  isMobile$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isMobile$ = this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
    ]).pipe(
      map(result => result.matches)
    )
  }
}
