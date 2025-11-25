import { Component } from '@angular/core';
import { ScreenLayoutService } from 'src/app/utils/screen-layout/screen-layout.service';

@Component({
  selector: 'app-docs-layout',
  templateUrl: './docs-layout.component.html',
  styleUrl: './docs-layout.component.scss',
})
export class DocsLayoutComponent {
  showMobileMenu = false;

  isMobile$ = this.screenLayoutService.isMobile$;
  isTablet$ = this.screenLayoutService.isTablet$;
  isDesktop$ = this.screenLayoutService.isDesktop$;

  constructor(private screenLayoutService: ScreenLayoutService) {}

  ngOnInit(): void {
    this.isMobile$.subscribe((isMobile) => {
      if (!isMobile) {
        this.showMobileMenu = false;
      }
    });
  }

  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }

  closeMobileMenu(): void {
    this.showMobileMenu = false;
  }
}
