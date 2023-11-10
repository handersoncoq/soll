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
  fontPageImage = './assets/img/font-page-img.png'

  constructor(private contentManagerService: ContentManagerService){}

  ngOnInit() {
    this.contentManagerService.getSlongan().subscribe(
      data => this.slogan = data
    );
    this.contentManagerService.getLearnMore().subscribe(
      data => this.learnMore = data
    );
  }

}
