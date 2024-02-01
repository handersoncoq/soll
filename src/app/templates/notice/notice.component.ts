import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DISCLAIMER_TEXT } from 'src/app/utils/constants/Notice';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent {

  notice: any;
  googleUrl = 'https://www.google.com/'
  welcomeMsg = "Welcome! Don't forget to share your feedback after exploring!"

  constructor(public dialogRef: MatDialogRef<NoticeComponent>, private snackBar: MatSnackBar) {
    this.notice = JSON.parse(DISCLAIMER_TEXT);
  }

  onAccept(): void {
    this.sendWelcomeMsg();
    this.dialogRef.close();
  }

  clickAway() {
    window.location.href = this.googleUrl;
  }  

  sendWelcomeMsg(){
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        message: this.welcomeMsg,
        type: 'welcome'
      },
      panelClass: 'app-snackbar-neutral',
    });
  }
}
