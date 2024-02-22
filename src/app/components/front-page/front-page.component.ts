import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { is } from 'date-fns/locale';
import { forkJoin } from 'rxjs';
import { TitleBodyArrayType } from 'src/app/interaces/TitleBodyArrayType';
import { ContentManagerService } from 'src/app/services/content-manager/content-manager.service';
import { PublicInteractionService } from 'src/app/services/public-interaction/public-interaction.service';
import { ScreenLayoutService } from 'src/app/utils/screen-layout/screen-layout.service';

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
  isMobile = true;
  heroImage!: string;

  intervalId: any;
  currentImageIndex = 0;
  images: string[] = [
    '/assets/img/connect-and-thrive.webp',
    '/assets/img/elevate-your-savings.webp',
    '/assets/img/empower-with-soll-community.webp',
    '/assets/img/unite-for-saving.webp',
    '/assets/img/revive-community-saving.webp',
  ];
  currentImage!: string;
  $accentColor = '#35425B';
  inputForm!: FormGroup;

  constructor(private contentManagerService: ContentManagerService, private router: Router, private screenService: ScreenLayoutService,
    private formBuilder: FormBuilder, private publicInteractionService: PublicInteractionService){
    this.frontPageLogo = this.contentManagerService.getAppLogo6();
    this.trustPilot = this.contentManagerService.getTrustpilotAndStars()[0];
    this.fiveStars = this.contentManagerService.getTrustpilotAndStars()[1];
    this.partners = this.contentManagerService.getPartners();
    this.contentVideos = this.contentManagerService.getContentVideos();
    this.heroImage = this.contentManagerService.getHeroImage();
    this.startSlideshow();
    this.inputForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.email]],
    })
  }

  ngOnInit() {
    this.screenService.isMobile$.subscribe(isDesktop => { this.isMobile = isDesktop; });
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
    const contentDiv = document.querySelector('.content');
    const heroImages = document.querySelector('.heroImages');
    contentDiv?.classList.add('transition');
    setTimeout(() => {
      heroImages?.classList.remove('heroImages');
      contentDiv?.classList.remove('transition');
    }, 500);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  setCurrentImage(index: number): void {
    this.currentImageIndex = index;
    this.currentImage = this.images[index];
    this.slogan = this.taglines.array[this.currentImageIndex];
  }

  activeColor(index: number): string {
    return this.$accentColor;
  }

  inactiveColor(index: number): string {
    return '#E3E7F1';
  }

  handleSwipeLeft(event: any) {
    console.log(event)
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    this.setCurrentImage(this.currentImageIndex);
  }

  handleSwipeRight(event: any) {
    console.log(event)
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
    this.setCurrentImage(this.currentImageIndex);
  }

  isCurrentImage(imageSrc: string): boolean {
    return this.currentImage === imageSrc;
  }

  getStarted() {
    const emailValue = this.inputForm.get('email')?.value;
    if (emailValue) {
      this.publicInteractionService.setEmail(emailValue)
    }
    this.router.navigate(['/get-started']);
  }  

}
