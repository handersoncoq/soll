import { Component, HostListener } from '@angular/core';
import { ContentManagerService } from './services/content-manager/content-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Soll';
  showLogo = false;
  appLogo!: string;

  constructor(private contentManagerService: ContentManagerService){
    this.appLogo = this.contentManagerService.getAppLogo3();
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
