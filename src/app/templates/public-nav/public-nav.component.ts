import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContentManagerService } from 'src/app/services/content-manager/content-manager.service';
import { DialogueComponent } from '../dialogue/dialogue.component';
import { InfoDetails } from 'src/app/interaces/Info';
import { StyleManagerService } from 'src/app/services/style-manager/style-manager.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatMenuTrigger } from '@angular/material/menu';
import { supportedLanguages } from 'src/app/utils/constants/Languages';
import { Observable } from 'rxjs';
import { ScreenLayoutService } from 'src/app/utils/screen-layout/screen-layout.service';

@Component({
  selector: 'app-public-nav',
  templateUrl: './public-nav.component.html',
  styleUrls: ['./public-nav.component.scss'],
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
export class PublicNavComponent implements OnInit {
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  appLogo!: string;
  infoDetails!: InfoDetails;
  enterAnimationDuration = '400ms';
  exitAnimationDuration = '400ms';
  shake = false;
  interval: any;
  languages = supportedLanguages;

  isMobile$: Observable<boolean>;

  constructor(
    private contentManagerService: ContentManagerService,
    private styleManager: StyleManagerService,
    private router: Router,
    private dialog: MatDialog,
    private screenLayoutService: ScreenLayoutService
  ) {
    this.isMobile$ = this.screenLayoutService.isMobile$;
    this.contentManagerService
      .getInfo()
      .subscribe((details) => (this.infoDetails = details));
    this.appLogo = this.contentManagerService.getAppLogo();
  }

  ngOnInit(): void {
    this.styleManager.loadMaterialSymbols();
  }

  navigateTo(route: string, fragment: string) {
    this.router.navigate([route], { fragment: fragment });
  }

  navigateToSimpleRoute(route: string) {
    this.router.navigate([route]);
  }

  openInquireDialog(): void {
    this.dialog.open(DialogueComponent, {
      data: {
        title: this.infoDetails.inquireTitle,
        content: this.infoDetails.phoneNumber,
        copiable: true,
        isFeedback: false,
        enterAnimationDuration: this.enterAnimationDuration,
        exitAnimationDuration: this.exitAnimationDuration,
      },
    });
  }

  changeLanguage(language: string) {
    console.log(language);
  }
}
