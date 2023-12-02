import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentManagerService {

  // app content
  aboutUs_resourceLink = './assets/app-content/AboutUs.json';
  slogan_resourceLink = './assets/app-content/CompanySlogan.json';
  learnMore_resourceLink = './assets/app-content/LearnMore.json';
  faqs = './assets/app-content/Faqs.json';
  conceptOverview = './assets/app-content/ConceptOverview.json'


  // logo and images
  appLogo3 = './assets/logo/3.png';
  appLogo6 = './assets/logo/6.png';
  five_stars = './assets/img/five-stars.svg';

  // videos
  savingAtYourFingerTip = './assets/videos/saving-at-your-finger-tip.mp4';
  raiseAndSaveWithFriendsAndLovedOnes = './assets/videos/raise-and-save-with-friends-and-loved-ones1.mp4';
  bringYourIdeaToLife = './assets/videos/bring-your-dream-project-to-life.mp4';
  getExcitedWhenItsYourTurn = './assets/videos/get-excited-when-its-your-turn.mp4';
  startSavingForTheirFuture = './assets/videos/start-saving-for-their-future.mp4';

  // partners
  trustpilot = './assets/partners/trustpilot.svg';
  visa = './assets/partners/visa.svg';
  bank_of_america = './assets/partners/bank-of-america.svg';
  paypal = './assets/partners/paypal.svg';
  stripe = './assets/partners/stripe.svg';



  constructor(private http: HttpClient) {}

  getAboutUs(): Observable<any> {
    return this.http.get(this.aboutUs_resourceLink);
  }

  getSlogan(): Observable<any> {
    return this.http.get(this.slogan_resourceLink);
  }

  getLearnMore(): Observable<any> {
    return this.http.get(this.learnMore_resourceLink);
  }

  getFaqs(): Observable<any> {
    return this.http.get(this.faqs);
  }

  getConceptOverview(): Observable<any> {
    return this.http.get(this.conceptOverview);
  }

  getAppLogo3(): string{
    return this.appLogo3;
  }

  getAppLogo6(): string{
    return this.appLogo6;
  }


  getTrustpilotAndStars(): string[]{
    return [this.trustpilot, this.five_stars]
  }

  getPartners(): string[]{
    return [
            this.visa,
            this.stripe,
            this.bank_of_america, 
            this.paypal,
          ]
  }

  getContentVideos(): string[]{
    return [
      this.savingAtYourFingerTip,
      this.raiseAndSaveWithFriendsAndLovedOnes,
      this.bringYourIdeaToLife,
      this.getExcitedWhenItsYourTurn,
      this.startSavingForTheirFuture
    ]
  }

  // ***************************************************************************

  loadMaterialSymbols() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
    document.head.appendChild(link);
  }

}
