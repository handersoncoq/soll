import { Component, HostBinding, HostListener, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StyleManagerService } from './services/style-manager/style-manager.service';
import { NoticeComponent } from './templates/notice/notice.component';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private routerSubscription!: Subscription;
  
  disclaimerAccepted = false;
  title = 'Soll';
  showIcon = false;
  isDashboardTheme = false;

  constructor(
    public dialog: MatDialog, 
    private styleManager: StyleManagerService, 
    public router: Router,
    private renderer: Renderer2
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });
  }

  ngOnInit(): void {

    this.styleManager.disableScroll();

    this.applyDashboardTheme();
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.applyDashboardTheme();
    });
    
    const dialogRef = this.dialog.open(NoticeComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => {
      this.disclaimerAccepted = true;
      this.styleManager.enableScroll();
    });
  }

  @HostBinding('class.no-scroll') get noScroll() {
    return !this.styleManager.isScrollEnabled;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 20) {
      this.showIcon = true;
    } else {
      this.showIcon = false;
    }
  }

  scrollToTop(){
    window.scroll({
      top: 0,
      behavior: 'smooth'})
  }

  shouldShowNavbar(): boolean {
    const hideOnRoutes = ['/sign-in', '/get-started', '/my-dashboard'];
    const shouldHideNavbar = hideOnRoutes.some(route => this.router.url === route);
    const isGroupRoute = this.router.url.startsWith('/group/');
    return !(shouldHideNavbar || isGroupRoute);
  }
  

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private isPostLogin(): boolean {
    const currentUrl = this.router.url;
  
    if (currentUrl === '/my-dashboard') {
      return true;
    }
  
    if (currentUrl.startsWith('/group/')) {
      return true;
    }
  
    return false;
  }
  

  private applyDashboardTheme(): void {
    if (this.isPostLogin()) {
      this.renderer.addClass(document.body, 'dashboard-theme');
      this.styleManager.setDashboardTheme(true);
    } else {
      this.renderer.removeClass(document.body, 'dashboard-theme');
      this.styleManager.setDashboardTheme(false);
    }
  }
}
