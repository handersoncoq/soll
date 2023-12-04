import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContentManagerService } from 'src/app/services/content-manager/content-manager.service';
import { DialogueComponent } from '../dialogue/dialogue.component';
import { InfoDetails } from 'src/app/interaces/Info';

@Component({
  selector: 'app-public-nav',
  templateUrl: './public-nav.component.html',
  styleUrls: ['./public-nav.component.scss']
})
export class PublicNavComponent implements OnInit{

  infoDetails!: InfoDetails
  enterAnimationDuration = '400ms';
  exitAnimationDuration = '400ms';


  constructor(private contentManagerService: ContentManagerService, private router: Router, private dialog: MatDialog){
    this.contentManagerService.getInfo().subscribe(
      (details) => this.infoDetails = details
    )
  }

  ngOnInit(): void {
    this.contentManagerService.loadMaterialSymbols();
  }

  navigateTo(link: string){
    this.router.navigate([link]);
  }

  openDialog(title: string, content: string): void {
    this.dialog.open(DialogueComponent, {
      data: {
        title: title,
        content: content,
        copiable: true,
        width: '100%',
        enterAnimationDuration: this.enterAnimationDuration,
        exitAnimationDuration: this.exitAnimationDuration,
      },
    });
  }

}
