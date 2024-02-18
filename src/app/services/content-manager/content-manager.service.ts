import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { InfoDetails } from 'src/app/interaces/Info';
import { PrivacyPolicyComponent } from 'src/app/templates/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from 'src/app/templates/terms-and-conditions/terms-and-conditions.component';
import { UnsuccessfulJoinComponent } from 'src/app/templates/unsuccessful-join/unsuccessful-join.component';
import { ScreenLayoutService } from 'src/app/utils/screen-layout/screen-layout.service';

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
  solLogo = './assets/logo/soll.png';
  appLogoDark = './assets/logo/logo-dark.png';
  five_stars = './assets/img/five-stars.svg';

  // videos
  savingAtYourFingerTip = './assets/img/Saving-at -your-fingertips.png';
  raiseAndSaveWithFriendsAndLovedOnes = './assets/img/raise-save-with-friends.png';
  bringYourIdeaToLife = './assets/img/bring-your-dream-project-to-life.png';
  getExcitedWhenItsYourTurn = './assets/img/get-excited.png';
  startSavingForTheirFuture = './assets/img/start-saving-for-their-future.png';
  howItWorks = './assets/img/how-it-works.png';
  noOnlineTransaction = './assets/img/no-online-transaction.png';

  // partners
  trustpilot = './assets/partners/trustpilot.svg';
  visa = './assets/partners/visa.svg';
  bank_of_america = './assets/partners/bank-of-america.svg';
  paypal = './assets/partners/paypal.svg';
  stripe = './assets/partners/stripe.svg';

  // properties
  isMobile = true;
  enterAnimationDuration = '400ms';
  exitAnimationDuration = '200ms';

  constructor(private http: HttpClient, private screenService: ScreenLayoutService,
    private _bottomSheet: MatBottomSheet, private dialog: MatDialog) {
      this.screenService.isMobile$.subscribe(
        isMobile =>{
          this.isMobile = isMobile;
        }
      );
    }

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
    return this.solLogo;
  }

  getAppLogo(): string{
    return this.solLogo;
  }

  getAppLogoDark(): string{
    return this.appLogoDark;
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
      this.howItWorks,
      this.noOnlineTransaction
    ]
  }

  openPrivacyPolicy(): void {
    if(this.isMobile) {
      this._bottomSheet.open(PrivacyPolicyComponent, {
        panelClass: 'bottom-sheet-container'
      });
    }else{
      this.dialog.open(PrivacyPolicyComponent,
        {
          width: '100%',
          enterAnimationDuration: this.enterAnimationDuration,
          exitAnimationDuration: this.exitAnimationDuration,
        })
    }
  }

  openTermsAndConditions(): void {
    if(this.isMobile){
      this._bottomSheet.open(TermsAndConditionsComponent, {
        panelClass: 'bottom-sheet-container'
      });
    }else{
      this.dialog.open(TermsAndConditionsComponent,
        {
          width: '100%',
          enterAnimationDuration: this.enterAnimationDuration,
          exitAnimationDuration: this.exitAnimationDuration,
        })
    }
  }

  openUnsuccessfulJoin(){
    this.dialog.open(UnsuccessfulJoinComponent,
      {
        width: '100%',
        enterAnimationDuration: this.enterAnimationDuration,
        exitAnimationDuration: this.exitAnimationDuration,
      })
  }

  closeBottomSheet(){
    this._bottomSheet.dismiss()
  }

}
