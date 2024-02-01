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
  welcomeMsg = "Welcome! Don't forget to share your feedback after exploring!"

  constructor(public dialogRef: MatDialogRef<NoticeComponent>, private snackBar: MatSnackBar) {
    this.notice = JSON.parse(DISCLAIMER_TEXT);
  }

  onAccept(): void {
    this.sendWelcomeMsg();
    this.dialogRef.close();
  }

  clickAway(){
    window.history.back();
  }

  sendWelcomeMsg(){
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        message: this.welcomeMsg,
        type: 'success'
      },
      panelClass: 'app-snackbar-success',
    });
  }
}
