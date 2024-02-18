import { Component, Input, OnInit } from '@angular/core';
import { Group } from 'src/app/interaces/Group';
import { GroupMember } from 'src/app/interaces/GroupMember';
import { DialogService } from 'src/app/services/dialog-service/dialog.service';
import { StyleManagerService } from 'src/app/services/style-manager/style-manager.service';

@Component({
  selector: 'app-group-circle',
  templateUrl: './group-circle.component.html',
  styleUrl: './group-circle.component.scss'
})
export class GroupCircleComponent implements OnInit{

  @Input() group!: Group | undefined;

  currentUser = 'Matgomory Ckan';
  paidMembersCount = 0;

  constructor(private dialogService: DialogService, private styleManager: StyleManagerService) {}
  
  ngOnInit(): void {
    // Calculate rotation and translation for each member based on their rank
    const totalMembers = this.group?.groupMembers.length;
    const angleStep = 360 / totalMembers!;

    this.group?.groupMembers.forEach((member, index) => {
      const angle = angleStep * index;
      member['transform'] = `rotate(${angle}deg) translate(100px) rotate(-${angle}deg)`;
    });

    this.paidMembersCount = this.getPaidMembersCount();
    
  }

  getMemberInfo(member: GroupMember): string {
    let displayedName = member.name === this.currentUser ? 'You' : member.name
    if(member.paidOut)
      return `${displayedName}\nReputation Score: ${member.reputationScore}\nPaid Out`;
    return `${displayedName}\nReputation Score: ${member.reputationScore}`;

  }

   // Get group leader full name
   get groupLeaderName(): string {
    return `${this.group!.groupLeader.firstName} ${this.group!.groupLeader.lastName}`;
  }


  openLeaderDialog() {
    const buttonClickCallback = () => {
      console.log('Contact', this.groupLeaderName);
    };

    this.dialogService.openLeaderDialog(
      this.groupLeaderName,
      this.group!.groupLeader.reputationScore,
      buttonClickCallback
      );
  }

  getPaidMembersCount(): number{
    return this.group!.groupMembers.filter(
      member =>member.paidOut
      ).length
  }

  getPayoutSystemIcon(): string{
    return this.styleManager.getPayoutSystemIcon(this.group!)
  }

}
