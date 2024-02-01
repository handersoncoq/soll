import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  private googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSexbwAYOOp4SMCvYseWQvHMqDoQogvviOLz_QcIxz8OHav-YA/viewform?embedded=true';
  formUrl!: SafeResourceUrl;
  isLoading = true;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.formUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.googleFormUrl);
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

}