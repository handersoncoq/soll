import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentManagerService {

  aboutUs_resourceLink = './assets/app-content/AboutUs.json'
  slogan_resourceLink = './assets/app-content/CompanySlogan.json'
  learnMore_resourceLink = './assets/app-content/LearnMore.json'

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

  // ***************************************************************************

  loadMaterialSymbols() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
    document.head.appendChild(link);
  }

}
