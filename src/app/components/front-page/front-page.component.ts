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
  currentImageIndex = 0;
  images: string[] = [
    '/assets/img/hero-image2.webp',
    '/assets/img/hero-image0.webp',
    '/assets/img/hero-image1.webp',
    '/assets/img/hero-image3.webp',
    '/assets/img/hero-image4.webp',
  ];
  currentImage!: string;
  $accentColor = '#35425B';
  progessPercent = '20%';

  constructor(private contentManagerService: ContentManagerService){
    this.frontPageLogo = this.contentManagerService.getAppLogo6();
    this.trustPilot = this.contentManagerService.getTrustpilotAndStars()[0];
    this.fiveStars = this.contentManagerService.getTrustpilotAndStars()[1];
    this.partners = this.contentManagerService.getPartners();
    this.contentVideos = this.contentManagerService.getContentVideos();
    this.startSlideshow();

  }

  ngOnInit() {
    this.currentImage = this.images[0];
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
      this.toggleBackground(this.currentImageIndex);
    }, 5000);
  }

  toggleBackground(index: number) {
    this.moveProgess(index);
    const contentDiv = document.querySelector('.content');
    contentDiv?.classList.add('transition');
    setTimeout(() => {
      contentDiv?.classList.remove('transition');
    }, 500);
  }

  moveProgess(index: number){
    if(index == 0) this.progessPercent = '20%'
    if(index == 1) this.progessPercent = '40%'
    if(index == 2) this.progessPercent = '60%'
    if(index == 3) this.progessPercent = '80%'
    if(index == 4) this.progessPercent = '100%'
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  setCurrentImage(index: number): void {
    this.currentImageIndex = index;
    this.currentImage = this.images[index];
    this.moveProgess(index);
    this.slogan = this.taglines.array[this.currentImageIndex];
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
