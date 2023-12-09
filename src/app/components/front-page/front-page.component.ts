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

  slogan!: string;
  learnMore!: TitleBodyArrayType;
  frontPageLogo: string;
  trustPilot: string;
  fiveStars: string;
  taglines!: any;
  partners: string[];
  faqs!: any[];
  keyWords!: any;
  contentVideos: string[];
  activatedIconId: string | null = null;

  intervalId: any;
  currentImageIndex: number = 0;
  images: string[] = [
    '/assets/img/hero-image2.webp',
    '/assets/img/hero-image0.webp',
    '/assets/img/hero-image1.webp',
    '/assets/img/hero-image3.webp',
    '/assets/img/hero-image4.webp',
  ];
  currentImage = this.images[0];
  $accentColor = '#35425B';

  constructor(private contentManagerService: ContentManagerService){
    this.frontPageLogo = this.contentManagerService.getAppLogo6();
    this.trustPilot = this.contentManagerService.getTrustpilotAndStars()[0];
    this.fiveStars = this.contentManagerService.getTrustpilotAndStars()[1];
    this.partners = this.contentManagerService.getPartners();
    this.contentVideos = this.contentManagerService.getContentVideos();
    this.startSlideshow();

  }

  ngOnInit() {
    forkJoin({
        slogan: this.contentManagerService.getSlogan(),
        learnMore: this.contentManagerService.getLearnMore(),
        faqs: this.contentManagerService.getFaqs(),
        keyWords: this.contentManagerService.getKeyWords(),
        taglines: this.contentManagerService.getTaglines()
    }).subscribe(results => {
        this.slogan = results.slogan;
        this.learnMore = results.learnMore;
        this.faqs = results.faqs;
        this.keyWords = results.keyWords;
        this.taglines = results.taglines;
        this.slogan = results.taglines.array[0];
    });
}

  startSlideshow() {
    this.intervalId = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      this.currentImage = this.images[this.currentImageIndex];
      if(this.taglines) this.slogan = this.taglines.array[this.currentImageIndex];
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

  keyWordsValid(): boolean{
    return this.keyWords && this.keyWords.eps && 
    this.keyWords.ecps && this.keyWords.leaders;
  }

  trackTooltip(iconId: string) {
    this.activatedIconId = this.activatedIconId === iconId ? null : iconId;
  }

}
