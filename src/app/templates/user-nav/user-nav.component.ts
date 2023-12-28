import { trigger, transition, style, animate } from '@angular/animations';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ContentManagerService } from 'src/app/services/content-manager/content-manager.service';
import { supportedLanguages } from 'src/app/utils/constants/Languages';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.scss',
  animations: [
    trigger('accordion-animation', [
      transition(':enter', [
        style({ opacity: 0, height: 0 }),
        animate('400ms ease-in-out', style({ opacity: 1, height: '*' })),
      ]),
      transition(':leave', [
        style({ opacity: 1, height: '*' }),
        animate('400ms ease-out', style({ opacity: 0, height: 0 })),
      ]),
    ]),
  ],
})
export class UserNavComponent {

  languages = supportedLanguages;
  navLogo: string;
  showSpinner = false;

  constructor(
    private contentManagerService: ContentManagerService,
    private router: Router,
  ) {
    this.navLogo = this.contentManagerService.getAppLogoDark();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const contentDiv = document.querySelector('.nav-class');
    if (window.scrollY > 20) {
      contentDiv?.classList.add('bottom-shadow');
    } else {
      contentDiv?.classList.remove('bottom-shadow');
    }
  }

  changeLanguage(language: string){
    console.log(language)
  }

  signOut() {
    setTimeout(() => {
      this.showSpinner = true;
    }, 1000);
    this.router.navigate(['']);
  }

}
