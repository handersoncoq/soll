import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogueComponent } from '../dialogue/dialogue.component';
import { GROUP_STRENGTH_DESCRIPTION } from 'src/app/utils/constants/GroupStrengthDescription';
import { Group } from 'src/app/interaces/Group';

@Component({
  selector: 'app-group-strength',
  templateUrl: './group-strength.component.html',
  styleUrls: ['./group-strength.component.scss']
})
export class GroupStrengthComponent implements OnInit {
  @Input() group!: Group;

  groupStrength = 0;
  strengthPercent = 0;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.groupStrength = this.calculateGroupStrength();
    this.strengthPercent = this.groupStrength*100;
  }

 calculateGroupStrength(): number {
    if (!this.group) return 0
    const members = this.group.groupMembers;
    if(members.length === 0) return 0
    const totalScore = members.reduce((acc, member) => acc + member.reputationScore, 0);
    return (totalScore / members.length)/100.00;
  }
  

  openDialogue(): void {
    this.dialog.open(DialogueComponent, {
      data: {
        title: 'Group Strength',
        content: GROUP_STRENGTH_DESCRIPTION,
        copiable: false,
        isFeedback: false,
      },
    });
  }

}