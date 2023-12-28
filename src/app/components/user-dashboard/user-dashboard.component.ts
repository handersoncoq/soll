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

  now = new Date();

  activeGroups: GroupDetail[] = [
    {
      groupName: 'HART-CONTR-023500',
      payoutSystem: 'EPS',
      savingsTarget: 10000,
      nextContributionAmount: 500,
      groupSize: 10,
      rank: 4,
      nextContributionDate: new Date(
        this.now.getFullYear(),
        this.now.getMonth(),
        this.now.getDate() + 15
      ),
      cycleStartDate: new Date(this.now.getFullYear(), 10, 23),
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
        this.now.getFullYear(),
        this.now.getMonth(),
        this.now.getDate() + 30
      ),
      cycleStartDate: new Date(this.now.getFullYear(), 10, 23),
      frequency: 30,
    },
  ];

  nextPayoutDate: Date;
  daysUntilPayout = 0;
  fillPercentage = 0;
  fillColor = '#20a7db';

  daysToAdd = 55;


  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.nextPayoutDate = new Date(
      this.activeGroups[0].cycleStartDate.getTime() +
        this.daysToAdd * 24 * 60 * 60 * 1000 //
    );
  }

  ngOnInit(): void {
    this.animateCircleFill();
    this.animateProgressBars();
  }

  calculateFillPercentage(): void {
    const currentTime = new Date().getTime();
    const payoutTime = this.nextPayoutDate.getTime();
    const cycleStartTime = this.activeGroups[0].cycleStartDate.getTime();

    const timeDiff = payoutTime - currentTime;
    this.daysUntilPayout = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    const totalCycleTime = payoutTime - cycleStartTime;
    const elapsedCycleTime = currentTime - cycleStartTime;

    this.fillPercentage = Math.max(
      0,
      (elapsedCycleTime / totalCycleTime) * 100
    );

    const circleFillElement = this.el.nativeElement.querySelector(
      '.inner-circle-dynamic-fill'
    );
    if (circleFillElement) {
      this.renderer.setStyle(
        circleFillElement,
        'background',
        `conic-gradient(${this.fillColor} ${this.fillPercentage}%, #ddd ${this.fillPercentage}%)`
      );
    }
  }

  animateCircleFill(): void {
    this.calculateFillPercentage();
    let currentFill = 0;
    const increment = 0.5;
    const intervalTime = 10;
  
    const fillInterval = setInterval(() => {
      if (currentFill < this.fillPercentage) {
        currentFill += increment;
        this.updateCircleFill(currentFill);
      } else {
        clearInterval(fillInterval);
      }
    }, intervalTime);
  }
  
  updateCircleFill(currentFill: number): void {
    const circleFillElement = this.el.nativeElement.querySelector('.inner-circle-dynamic-fill');
    if (circleFillElement) {
      this.renderer.setStyle(
        circleFillElement,
        'background',
        `conic-gradient(${this.fillColor} ${currentFill}%, #ddd ${currentFill}%)`
      );
    }
  }

  animateProgressBars() {
    const originalRanks = this.activeGroups.map((group) => group.rank);
    this.activeGroups.forEach((group) => (group.rank = 0));

    setTimeout(() => {
      this.activeGroups.forEach((group, index) => {
        group.rank = originalRanks[index];
      });
    }, 100);
  }
}
