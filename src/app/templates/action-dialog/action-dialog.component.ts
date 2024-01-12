import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-action-dialog',
  templateUrl: './action-dialog.component.html',
  styleUrl: './action-dialog.component.scss'
})
export class ActionDialogComponent {

  constructor(public dialogRef: MatDialogRef<ActionDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onButtonClick() {
    if (this.data && this.data.buttonClickCallback) {
      this.data.buttonClickCallback();
    }
  }

}
