import { Component, OnInit } from '@angular/core';
import { TitleBodyArrayType } from 'src/app/interaces/TitleBodyArrayType';
import { TitleBodyType } from 'src/app/interaces/TitleBodyType';
import { ContentManagerService } from 'src/app/services/content-manager/content-manager.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit{

  slogan!: TitleBodyType;
  learnMore!: TitleBodyArrayType;
  frontPageLogo!: string;

  constructor(private contentManagerService: ContentManagerService){
    this.frontPageLogo = this.contentManagerService.getAppLogo3()
  }

  ngOnInit() {
    this.contentManagerService.getSlongan().subscribe(
      data => this.slogan = data
    );
    this.contentManagerService.getLearnMore().subscribe(
      data => this.learnMore = data
    );
  }

}
