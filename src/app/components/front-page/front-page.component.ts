import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit{

  slogan = "A better way to save money between friends and loved ones. Learn about Soll's different systems.";
  learnMore = 'We have a system for everyone, based on your need.'
  fontPageImage = './assets/img/font-page-img.png'

  ngOnInit() {
    this.loadMaterialSymbols();
  }

  loadMaterialSymbols() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
    document.head.appendChild(link);
  }

}
