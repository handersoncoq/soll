import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StyleManagerService {

  private _isScrollEnabled = false;

  private dashboardTheme = new BehaviorSubject<boolean>(window.matchMedia('(prefers-color-scheme: dark)').matches);
  isDarkMode = this.dashboardTheme.asObservable();
  isDashboard = new BehaviorSubject<boolean>(false);

  constructor() { }

  get isScrollEnabled(): boolean {
    return this._isScrollEnabled;
  }

  enableScroll(): void {
    this._isScrollEnabled = true;
    document.body.classList.remove('no-scroll');
  }

  disableScroll(): void {
    this._isScrollEnabled = false;
    document.body.classList.add('no-scroll');
  }

  toggleTheme() {
    this.dashboardTheme.next(!this.dashboardTheme.value);
  }

  setDashboardTheme(value: boolean){
    this.isDashboard.next(value);
  }

  setTheme(darkMode: boolean) {
    this.dashboardTheme.next(darkMode);
  }

  loadMaterialSymbols() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
    document.head.appendChild(link);
  }
}
