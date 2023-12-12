import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InfoDetails } from 'src/app/interaces/Info';

@Injectable({
  providedIn: 'root'
})
export class ContentManagerService {

  // app content
  aboutUs = './assets/app-content/AboutUs.json';
  slogan = './assets/app-content/CompanySlogan.json';
  taglines = './assets/app-content/Taglines.json';
  learnMore = './assets/app-content/LearnMore.json';
  faqs = './assets/app-content/Faqs.json';
  conceptOverview = './assets/app-content/ConceptOverview.json';
  infoDetails = './assets/app-content/Info.json';
  privacyPolicy = './assets/app-content/PrivacyPolicy.json';
  termsAndConditions = './assets/app-content/TermsAndConditions.json';
  keyWords = './assets/app-content/KeyWords.json';
  appVersion = '0.0.1';

  // logo and images
  appLogo3 = './assets/logo/3.png';
  appLogo6 = './assets/logo/6.png';
  five_stars = './assets/img/five-stars.svg';

  // videos
  savingAtYourFingerTip = './assets/videos/saving-at-your-finger-tip.mp4';
  raiseAndSaveWithFriendsAndLovedOnes = './assets/videos/raise-and-save-with-friends-and-loved-ones.mp4';
  bringYourIdeaToLife = './assets/videos/bring-your-dream-project-to-life.mp4';
  getExcitedWhenItsYourTurn = './assets/videos/get-excited-when-its-your-turn.mp4';
  startSavingForTheirFuture = './assets/videos/start-saving-for-their-future.mp4';
  howItWorks = './assets/videos/how-it-works.mp4';

  // partners
  trustpilot = './assets/partners/trustpilot.svg';
  visa = './assets/partners/visa.svg';
  bank_of_america = './assets/partners/bank-of-america.svg';
  paypal = './assets/partners/paypal.svg';
  stripe = './assets/partners/stripe.svg';



  constructor(private http: HttpClient) {}

  getAboutUs(): Observable<any> {
    return this.http.get(this.aboutUs);
  }

  getSlogan(): Observable<any> {
    return this.http.get(this.slogan);
  }

  getLearnMore(): Observable<any> {
    return this.http.get(this.learnMore);
  }

  getFaqs(): Observable<any> {
    return this.http.get(this.faqs);
  }

  getConceptOverview(): Observable<any> {
    return this.http.get(this.conceptOverview);
  }

  getPrivacyPolicy(): Observable<any> {
    return this.http.get(this.privacyPolicy);
  }

  getTermsAndConditions(): Observable<any> {
    return this.http.get(this.termsAndConditions);
  }

  getKeyWords(): Observable<any> {
    return this.http.get(this.keyWords);
  }

  getTaglines(): Observable<any> {
    return this.http.get(this.taglines);
  }


  getInfo(): Observable<InfoDetails> {
    return this.http.get<InfoDetails>(this.infoDetails);
  }

  getAppLogo3(): string{
    return this.appLogo3;
  }

  getAppLogo6(): string{
    return this.appLogo6;
  }

  getAppVersion(): string{
    return this.appVersion;
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
      this.startSavingForTheirFuture,
      this.howItWorks
    ]
  }

}
