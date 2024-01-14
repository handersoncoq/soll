import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StyleManagerService } from './services/style-manager/style-manager.service';
import { NoticeComponent } from './templates/notice/notice.component';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { register } from 'swiper/element/bundle';

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

    register()

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

  shouldShowPublicNav(): boolean {
    const hideOnRoutes = ['/sign-in', '/get-started', '/my-dashboard', '/join-a-group'];
    const shouldHideNavbar = hideOnRoutes.some(route => this.router.url === route);
    const isGroupRoute = this.router.url.startsWith('/group/');
    return !(shouldHideNavbar || isGroupRoute);
  }
  

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  isPostLogin(): boolean {
    const postLoginRoutes = ['/my-dashboard', '/group/', '/join-a-group'];
    const currentUrl = this.router.url;
    return postLoginRoutes.some(route => currentUrl.startsWith(route));
}


  applyDashboardTheme(): void {
    if (this.isPostLogin()) {
      this.styleManager.setDashboardTheme(true);
  
      const preferredTheme = localStorage.getItem('theme');
      if (preferredTheme === 'Dark Mode') {
        document.body.classList.add('dark-mode');
        this.styleManager.setTheme(true);
      } else {
        document.body.classList.remove('dark-mode');
        this.styleManager.setTheme(false);
      }
    } else {
      this.styleManager.setDashboardTheme(false);
      document.body.classList.remove('dark-mode');
    }
  }  
  
  
}
