import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GroupLeader } from 'src/app/interaces/GroupLeader';
import { GroupMember } from 'src/app/interaces/GroupMember';
import { ActionDialogComponent } from '../action-dialog/action-dialog.component';
import { DialogService } from 'src/app/services/dialog-service/dialog.service';

@Component({
  selector: 'app-group-circle',
  templateUrl: './group-circle.component.html',
  styleUrl: './group-circle.component.scss'
})
export class GroupCircleComponent implements OnInit{

  @Input() groupMembers!: GroupMember[] | undefined;
  @Input() groupLeader!: GroupLeader | undefined;

  constructor(private dialogService: DialogService) {}
  
  ngOnInit(): void {
    // Calculate rotation and translation for each member based on their rank
    const totalMembers = this.groupMembers?.length;
    const angleStep = 360 / totalMembers!;

    this.groupMembers?.forEach((member, index) => {
      const angle = angleStep * index;
      member['transform'] = `rotate(${angle}deg) translate(100px) rotate(-${angle}deg)`;
    });
    
  }

  getMemberInfo(member: GroupMember): string {
    return `${member.name}\nReputation Score: ${member.reputationScore}\nPaid Out: ${member.paidOut ? 'Yes' : 'No'}`;
  }
  

  getGroupLeaderInfo(){
    return `Group Leader: ${this.groupLeader?.name}\nReputation Score: ${this.groupLeader?.reputationScore}`;
  }


  openLeaderDialog() {
    const buttonClickCallback = () => {
      console.log('Contact', this.groupLeader!.name);
    };

    this.dialogService.openLeaderDialog(
      this.groupLeader!.name,
      this.groupLeader!.reputationScore,
      buttonClickCallback
      );
  }
  

}
