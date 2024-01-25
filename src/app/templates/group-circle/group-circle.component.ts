import { Component, Input, OnInit } from '@angular/core';
import { Group } from 'src/app/interaces/Group';
import { GroupMember } from 'src/app/interaces/GroupMember';
import { DialogService } from 'src/app/services/dialog-service/dialog.service';

@Component({
  selector: 'app-group-circle',
  templateUrl: './group-circle.component.html',
  styleUrl: './group-circle.component.scss'
})
export class GroupCircleComponent implements OnInit{

  @Input() group!: Group | undefined;

  currentUser = 'Matgomory Ckan';

  constructor(private dialogService: DialogService) {}
  
  ngOnInit(): void {
    // Calculate rotation and translation for each member based on their rank
    const totalMembers = this.group?.groupMembers.length;
    const angleStep = 360 / totalMembers!;

    this.group?.groupMembers.forEach((member, index) => {
      const angle = angleStep * index;
      member['transform'] = `rotate(${angle}deg) translate(100px) rotate(-${angle}deg)`;
    });
    
  }

  getMemberInfo(member: GroupMember): string {
    let displayedName = member.name === this.currentUser ? 'You' : member.name
    return `${displayedName}\nReputation Score: ${member.reputationScore}\nPaid Out: ${member.paidOut ? 'Yes' : 'No'}`;
  }


  openLeaderDialog() {
    const buttonClickCallback = () => {
      console.log('Contact', this.group!.groupLeader.name);
    };

    this.dialogService.openLeaderDialog(
      this.group!.groupLeader.name,
      this.group!.groupLeader.reputationScore,
      buttonClickCallback
      );
  }

  getPaidMembersCount(): number{
    return this.group!.groupMembers.filter(
      member =>member.paidOut
      ).length
  }

}
