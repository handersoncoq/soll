import { trigger, transition, style, animate } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentManagerService } from 'src/app/services/content-manager/content-manager.service';
import { StyleManagerService } from 'src/app/services/style-manager/style-manager.service';
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
export class UserNavComponent implements OnInit{

  languages = supportedLanguages;
  navLogo!: string;
  isDarkMode = false;
  theme!: string;
  showSpinner = false;

  constructor(
    private contentManagerService: ContentManagerService,
    private router: Router, private styleManager: StyleManagerService
  ) {
    this.styleManager.isDarkMode.subscribe(mode => {
      this.isDarkMode = mode;
      this.applyStyles()
    });
  }

  ngOnInit(): void {}

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
    this.showSpinner = true;
    setTimeout(() => {
      this.router.navigate(['']);
    }, 1000);
  }

  toggleTheme(){
    this.isDarkMode = !this.isDarkMode
    this.styleManager.setTheme(this.isDarkMode);
    this.applyStyles()
    if(this.isDarkMode) localStorage.setItem('theme', 'Dark Mode')
    else localStorage.setItem('theme', 'Light Mode')
  }

  applyStyles(){
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
      this.theme = 'Dark Mode'
      this.navLogo = this.contentManagerService.getAppLogoDark();
    } else {
      document.body.classList.remove('dark-mode');
      this.theme = 'Light Mode';
      this.navLogo = this.contentManagerService.getAppLogo6();
    }
  }
  

}
