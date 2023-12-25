import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContentManagerService } from 'src/app/services/content-manager/content-manager.service';
import { DialogueComponent } from '../dialogue/dialogue.component';
import { InfoDetails } from 'src/app/interaces/Info';
import { StyleManagerService } from 'src/app/services/style-manager/style-manager.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-public-nav',
  templateUrl: './public-nav.component.html',
  styleUrls: ['./public-nav.component.scss'],
  animations: [
    trigger('accordion', [
      transition(':enter', [
        style({ opacity: 0, height: 0}),
        animate('500ms ease-in-out', style({ opacity: 1, height: '*' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, height: '*' }),
        animate('500ms ease-out', style({ opacity: 0, height: 0 }))
      ])
    ]),
  ]
})
export class PublicNavComponent implements OnInit{

  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  infoDetails!: InfoDetails
  enterAnimationDuration = '400ms';
  exitAnimationDuration = '400ms';
  shake = false;
  interval: any;

  constructor(private contentManagerService: ContentManagerService, private styleManager: StyleManagerService,
    private router: Router, private dialog: MatDialog){
    this.contentManagerService.getInfo().subscribe(
      (details) => this.infoDetails = details
    )
  }

  ngOnInit(): void {
    this.styleManager.loadMaterialSymbols();
    this.startShakeInterval();
  }

  navigateTo(route: string, fragment: string){
    this.router.navigate([route], { fragment: fragment });
  }

  navigateToSimpleRoute(route: string){
    this.router.navigate([route]);
  }

  openDialog(title: string, content: string, isFeedback: boolean): void {
    this.stopShakeInterval();
    const dialogRef = this.dialog.open(DialogueComponent, {
        data: {
            title: title,
            content: content,
            copiable: true,
            isFeedback: isFeedback,
            enterAnimationDuration: this.enterAnimationDuration,
            exitAnimationDuration: this.exitAnimationDuration,
        },
    });

    dialogRef.afterClosed().subscribe(() => {
        this.startShakeInterval();
    });
}

  shakeIcon() {
    this.shake = true;
    setTimeout(() => this.shake = false, 1000);
}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const contentDiv = document.querySelector('.nav-class');
    if (window.scrollY > 20) {
      contentDiv?.classList.add('bottom-shadow');
      if (this.interval) {
        clearInterval(this.interval);
      }
    } else {
      contentDiv?.classList.remove('bottom-shadow');
      this.startShakeInterval();

    }
  }

  ngOnDestroy() {
    if (this.interval) {
        clearInterval(this.interval);
    }
}

startShakeInterval() {
  this.stopShakeInterval();
  this.interval = setInterval(() => {
      if (window.scrollY === 0) {
          this.shake = true;
          setTimeout(() => this.shake = false, 500);
      }
  }, 10000);
}

stopShakeInterval() {
  if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
  }
}


}
