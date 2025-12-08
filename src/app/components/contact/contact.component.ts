import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  name: string | null = '';
  email: string | null = '';
  message: string | null = '';
  response: string = '';
  isProcessing: boolean = false;

  submitContactForm(form: NgForm): void {
    if (!this.name || !this.email || !this.message) {
      return;
    }

    this.isProcessing = true;

    setTimeout(() => {
      this.response = `We've received your message. Thanks!`;
      form.resetForm();
      this.isProcessing = false;
    }, 1200);
  }
}
