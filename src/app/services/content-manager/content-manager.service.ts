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
  appLogo = './assets/logo/3.png';
  five_stars = './assets/img/five-stars.svg';

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

  getSlongan(): Observable<any> {
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
    return this.appLogo;
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

  // ***************************************************************************

  loadMaterialSymbols() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
    document.head.appendChild(link);
  }

}
