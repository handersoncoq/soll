import { Component } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-feedback',
  standalone: true,
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent {
  private googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSexbwAYOOp4SMCvYseWQvHMqDoQogvviOLz_QcIxz8OHav-YA/viewform?embedded=true';
  formUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.formUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.googleFormUrl);
  }
}
