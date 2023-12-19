import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StyleManagerService } from './services/style-manager/style-manager.service';
import { NoticeComponent } from './templates/notice/notice.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  disclaimerAccepted = false;
  title = 'Soll';
  showIcon = false;

  constructor(public dialog: MatDialog, private styleManager: StyleManagerService, public router: Router){}

  ngOnInit(): void {
    this.styleManager.disableScroll();
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
    const hideOnRoutes = ['/sign-in', '/get-started'];
    return !hideOnRoutes.includes(this.router.url);
  }
}
