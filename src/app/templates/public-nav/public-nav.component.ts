import { Component, OnInit } from '@angular/core';
import { ContentManagerService } from 'src/app/services/content-manager/content-manager.service';

@Component({
  selector: 'app-public-nav',
  templateUrl: './public-nav.component.html',
  styleUrls: ['./public-nav.component.scss']
})
export class PublicNavComponent implements OnInit{

  constructor(private contentManagerService: ContentManagerService){}

  ngOnInit(): void {
    this.contentManagerService.loadMaterialSymbols();
  }

}
