import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { TitleBodyArrayType } from 'src/app/interaces/TitleBodyArrayType';
import { TitleBodyType } from 'src/app/interaces/TitleBodyType';
import { ContentManagerService } from 'src/app/services/content-manager/content-manager.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit, OnDestroy{

  slogan!: TitleBodyType;
  learnMore!: TitleBodyArrayType;
  frontPageLogo!: string;
  trustPilot!: string;
  fiveStars!: string;
  partners!: string[];
  faqs!: any[];

  intervalId: any;
  currentImageIndex: number = 0;
  images: string[] = [
    '/assets/img/hero-image0.webp',
    '/assets/img/hero-image1.webp',
    '/assets/img/hero-image2.webp',
    '/assets/img/hero-image3.webp',
    '/assets/img/hero-image4.webp',
  ];
  currentImage = this.images[0];
  $accentColor = '#35425B';

  constructor(private contentManagerService: ContentManagerService){
    this.frontPageLogo = this.contentManagerService.getAppLogo3();
    this.trustPilot = this.contentManagerService.getTrustpilotAndStars()[0];
    this.fiveStars = this.contentManagerService.getTrustpilotAndStars()[1];
    this.partners = this.contentManagerService.getPartners();
    this.startSlideshow();

  }

  ngOnInit() {
    forkJoin({
        slogan: this.contentManagerService.getSlogan(),
        learnMore: this.contentManagerService.getLearnMore(),
        faqs: this.contentManagerService.getFaqs()
    }).subscribe(results => {
        this.slogan = results.slogan;
        this.learnMore = results.learnMore;
        this.faqs = results.faqs;
    });
}

  startSlideshow() {
    this.intervalId = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      this.currentImage = this.images[this.currentImageIndex];
    }, 5000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  setCurrentImage(index: number): void {
    this.currentImageIndex = index;
    this.currentImage = this.images[index];
  }

  activeColor(index: number): string {
    return this.$accentColor;
  }

  inactiveColor(index: number): string {
    return 'white';
  }

}
