import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interaces/DialogueData';
import { ContentManagerService } from 'src/app/services/content-manager/content-manager.service';

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.scss']
})
export class DialogueComponent {

  userName = 'Your Name';
  userEmail = 'yourname@example.com';
  appVersion = '';
  feedbackMessage = '';
  
  constructor(
    public dialogRef: MatDialogRef<DialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public contentManagerService: ContentManagerService
  ) {
    this.appVersion = contentManagerService.getAppVersion();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  copyContent() {
    navigator.clipboard.writeText(this.data.content).then(
      () => {}
    ).catch(err => {
      console.info('Failed to copy text: ', err);
    });
  }

  sendFeedback() {
    const mailtoLink = this.createMailtoLink();
    window.location.href = mailtoLink;
  }

  createMailtoLink(): string {
    const email = this.data.content;
    const subject = encodeURIComponent(`Feedback from ${this.userName}`);
    const body = encodeURIComponent(
      `Name: ${this.userName}\n` +
      `Email: ${this.userEmail}\n` +
      `App Version: ${this.appVersion}\n\n` +
      `Feedback:\n${this.feedbackMessage}`
    );

    return `mailto:${email}?subject=${subject}&body=${body}`;
  }
}
