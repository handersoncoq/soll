import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleManagerService {

  private _isScrollEnabled = false;

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

  loadMaterialSymbols() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
    document.head.appendChild(link);
  }
}
