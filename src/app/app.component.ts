import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { ContentManagerService } from './services/content-manager/content-manager.service';
import { MatDialog } from '@angular/material/dialog';
import { StyleManagerService } from './services/style-manager/style-manager.service';
import { NoticeComponent } from './templates/notice/notice.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  disclaimerAccepted = false;
  title = 'Soll';
  showLogo = false;
  appLogo!: string;

  constructor(private contentManagerService: ContentManagerService, public dialog: MatDialog, private styleManager: StyleManagerService){
    this.appLogo = this.contentManagerService.getAppLogo3();
  }

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
      this.showLogo = true;
    } else {
      this.showLogo = false;
    }
  }

  scrollToTop(){
    window.scroll({
      top: 0,
      behavior: 'smooth'})
  }
}
