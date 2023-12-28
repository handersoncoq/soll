import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { GroupDetail } from 'src/app/interaces/GroupDetails';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  profilePic = '/assets/img/profile.png';

  userReputation = 85;
  activeGroupCount = 2;
  location = 'Hartford, CT';
  currentSaving = 12154;

  present = new Date();

  activeGroups: GroupDetail[] = [
    {
      groupName: 'HART-CONTR-023500',
      payoutSystem: 'EPS',
      savingsTarget: 10000,
      nextContributionAmount: 500,
      groupSize: 10,
      rank: 4,
      nextContributionDate: new Date(
        this.present.getFullYear(),
        this.present.getMonth(),
        this.present.getDate() + 15
      ),
      cycleStartDate: new Date(this.present.getFullYear(), 10, 23),
      frequency: 30,
    },
    {
      groupName: 'LEXI-CONTR-ECPS03',
      payoutSystem: 'ECPS',
      savingsTarget: 10000,
      nextContributionAmount: 500,
      groupSize: 10,
      rank: 7,
      nextContributionDate: new Date(
        this.present.getFullYear(),
        this.present.getMonth(),
        this.present.getDate() + 30
      ),
      cycleStartDate: new Date(this.present.getFullYear(), 10, 23),
      frequency: 30,
    },
  ];

  nextPayoutDate: Date;
  daysUntilPayout = 0;

  daysToAdd = 55;


  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.nextPayoutDate = new Date(
      this.activeGroups[0].cycleStartDate.getTime() +
        this.daysToAdd * 24 * 60 * 60 * 1000 //
    );
  }

  ngOnInit(): void {
  }

 
}
