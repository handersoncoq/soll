import { Component, OnInit } from '@angular/core';
import { GroupMember } from 'src/app/interaces/GroupMember';

@Component({
  selector: 'app-group-circle',
  templateUrl: './group-circle.component.html',
  styleUrl: './group-circle.component.scss'
})
export class GroupCircleComponent implements OnInit{

  profilePic = '/assets/img/profile.png';

  groupLeaderName = 'Bob Ryan';
  groupLeaderReputationScore = '96';

  groupMembers: GroupMember[] = [
    { name: 'Alice Fox', paidOut: true, rank: 1, reputationScore: 93, profilePic: this.profilePic },
    { name: 'Bob Just', paidOut: true, rank: 2, reputationScore: 84, profilePic: this.profilePic  },
    { name: 'Charlie Pierre', paidOut: true, rank: 3, reputationScore: 82, profilePic: this.profilePic  },
    { name: 'Pedro Ross', paidOut: true, rank: 4, reputationScore: 81, profilePic: this.profilePic  },
    { name: 'Ethan Muller', paidOut: false, rank: 5, reputationScore: 85, profilePic: this.profilePic  },
    { name: 'Fiona Bel', paidOut: false, rank: 6, reputationScore: 90, profilePic: this.profilePic  },
    { name: 'George Bertin', paidOut: false, rank: 7, reputationScore: 89, profilePic: this.profilePic  },
    { name: 'Augustina Buen', paidOut: false, rank: 8, reputationScore: 80, profilePic: this.profilePic  },
    { name: 'Ian Vibe', paidOut: false, rank: 9, reputationScore: 83, profilePic: this.profilePic  },
    { name: 'Julia Mane', paidOut: false, rank: 10, reputationScore: 92, profilePic: this.profilePic  }
  ];
  
  ngOnInit(): void {
    // Calculate rotation and translation for each member based on their rank
    const totalMembers = this.groupMembers.length;
    const angleStep = 360 / totalMembers;

    this.groupMembers.forEach((member, index) => {
      const angle = angleStep * index;
      member['transform'] = `rotate(${angle}deg) translate(100px) rotate(-${angle}deg)`;
    });
  }

  getMemberInfo(member: GroupMember): string {
    return `${member.name}\nReputation Score: ${member.reputationScore}\nPaid Out: ${member.paidOut ? 'Yes' : 'No'}`;
  }
  

  getGroupLeaderInfo(){
    return `Group Leader: ${this.groupLeaderName}\nReputation Score: ${this.groupLeaderReputationScore}`;
  }
  

}
