import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentManagerService } from 'src/app/services/content-manager/content-manager.service';

@Component({
  selector: 'app-public-nav',
  templateUrl: './public-nav.component.html',
  styleUrls: ['./public-nav.component.scss']
})
export class PublicNavComponent implements OnInit{

  constructor(private contentManagerService: ContentManagerService, private router: Router){}

  ngOnInit(): void {
    this.contentManagerService.loadMaterialSymbols();
  }

  navigateTo(link: string){
    this.router.navigate([link]);
  }

}
