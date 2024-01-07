import { Component, Input, OnInit } from '@angular/core';
import { GroupLeader } from 'src/app/interaces/GroupLeader';
import { GroupMember } from 'src/app/interaces/GroupMember';

@Component({
  selector: 'app-group-circle',
  templateUrl: './group-circle.component.html',
  styleUrl: './group-circle.component.scss'
})
export class GroupCircleComponent implements OnInit{

  @Input() groupMembers!: GroupMember[] | undefined;
  @Input() groupLeader!: GroupLeader | undefined;
  
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
  

}
