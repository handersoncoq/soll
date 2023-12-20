import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DISCLAIMER_TEXT } from 'src/app/constants/Notice';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent {

  notice: any;

  constructor(public dialogRef: MatDialogRef<NoticeComponent>) {
    this.notice = JSON.parse(DISCLAIMER_TEXT);
  }

  onAccept(): void {
    this.dialogRef.close();
  }
}
