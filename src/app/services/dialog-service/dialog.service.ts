// dialog.service.ts
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionDialogComponent } from 'src/app/templates/action-dialog/action-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialogRef: any;
  enterAnimationDuratio= '500ms';
  exitAnimationDuration='500ms';

  constructor(private dialog: MatDialog) {}

  openLeaderDialog(
    leaderName: string,
    reputationScore: number,
    buttonClickCallback?: () => void
  ) {
    this.dialogRef = this.dialog.open(ActionDialogComponent, {
      width: '400px',
      data: {
        title: 'Group Leader',
        value: `${leaderName}`,
        content: `Reputation Score: ${reputationScore}`,
        verified: true,
        action: 'Contact Group Leader',
        buttonClickCallback,
      },
      enterAnimationDuration: this.enterAnimationDuratio,
      exitAnimationDuration: this.exitAnimationDuration
    });

    return this.dialogRef;
  }

  openGroupDialog(
    groupName: string,
    warning: string,
    buttonClickCallback?: () => void
  ) {
    this.dialogRef = this.dialog.open(ActionDialogComponent, {
      width: '400px',
      data: {
        title: `Join ${groupName}?`,
        content: warning,
        action: 'Confirm',
        buttonClickCallback,
      },
      enterAnimationDuration: this.enterAnimationDuratio,
      exitAnimationDuration: this.exitAnimationDuration
    });

    return this.dialogRef;
  }

}
