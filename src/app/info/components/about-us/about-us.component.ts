import { Component, OnInit } from '@angular/core';
import { ContentManagerService } from 'src/app/services/content-manager/content-manager.service';
import { AboutUs } from '../../interfaces/AboutUs';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit{

  aboutUs!: AboutUs;
  profilePic = '/assets/img/profile.png';

  constructor(private contentManagerService: ContentManagerService){}
  
  ngOnInit(): void {
    this.contentManagerService.getAboutUs().subscribe(
      data => this.aboutUs = data
    );
  }

  onImageLoad(event: Event) {
    (event.target as HTMLImageElement).classList.add('loaded');
  }
  

}
