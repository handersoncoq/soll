import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContentManagerService } from 'src/app/services/content-manager/content-manager.service';
import { DialogueComponent } from '../dialogue/dialogue.component';
import { InfoDetails } from 'src/app/interaces/Info';
import { StyleManagerService } from 'src/app/services/style-manager/style-manager.service';

@Component({
  selector: 'app-public-nav',
  templateUrl: './public-nav.component.html',
  styleUrls: ['./public-nav.component.scss']
})
export class PublicNavComponent implements OnInit{

  infoDetails!: InfoDetails
  enterAnimationDuration = '400ms';
  exitAnimationDuration = '400ms';

  constructor(private contentManagerService: ContentManagerService, private styleManager: StyleManagerService,
    private router: Router, private dialog: MatDialog){
    this.contentManagerService.getInfo().subscribe(
      (details) => this.infoDetails = details
    )
  }

  ngOnInit(): void {
    this.styleManager.loadMaterialSymbols();
  }

  navigateTo(link: string){
    this.router.navigate([link]);
  }

  openDialog(title: string, content: string, isFeedback: boolean): void {
    this.dialog.open(DialogueComponent, {
      data: {
        title: title,
        content: content,
        copiable: true,
        isFeedback: isFeedback,
        enterAnimationDuration: this.enterAnimationDuration,
        exitAnimationDuration: this.exitAnimationDuration,
      },
    });
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

}
