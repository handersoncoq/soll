import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interaces/DialogueData';

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.scss']
})
export class DialogueComponent {
  
  constructor(
    public dialogRef: MatDialogRef<DialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  copyContent() {
    navigator.clipboard.writeText(this.data.content).then(
      () => {}
    ).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }
}
