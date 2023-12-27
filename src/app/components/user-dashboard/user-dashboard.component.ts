import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  profilePic = '/assets/img/profile.png';
  
  userReputation = 85;
  activeGroupCount = 2;
  location = 'Hartford, CT';

  currentSaving = 12154;

  groupName = 'HART-CONTR-023500';
  payoutSystem = 'EPS'
  savingsTarget = 10000;
  groupSize = 10;
  queu = 5;
  
  nextContributionDate: Date;
  nextContributionAmount = 500;

  cycleStartDate: Date;
  nextPayoutDate: Date ;
  daysUntilPayout = 0;
  fillPercentage = 0;
  fillColor = '#20a7db';

  constructor(private el: ElementRef, private renderer: Renderer2) {
    const now = new Date();
    this.nextContributionDate = new Date(now.getFullYear(), 11, 30);
    this.cycleStartDate = new Date(now.getFullYear(), 10, 23);
  
    const daysToAdd = 55;
    this.nextPayoutDate = new Date(this.cycleStartDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
  }
  
  ngOnInit(): void {
    this.calculateFillPercentage();
    console.log(this.daysUntilPayout, this.fillPercentage)
  }

  calculateFillPercentage(): void {
    const currentTime = new Date().getTime();
    const payoutTime = this.nextPayoutDate.getTime();
    const cycleStartTime = this.cycleStartDate.getTime();

    const timeDiff = payoutTime - currentTime;
    this.daysUntilPayout = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    const totalCycleTime = payoutTime - cycleStartTime;
    const elapsedCycleTime = currentTime - cycleStartTime;

    this.fillPercentage = Math.max(0, (elapsedCycleTime / totalCycleTime) * 100);
    
    const circleFillElement = this.el.nativeElement.querySelector('.inner-circle-dynamic-fill');
    if (circleFillElement) {
      this.renderer.setStyle(circleFillElement, 'background', `conic-gradient(${this.fillColor} ${this.fillPercentage}%, #ddd ${this.fillPercentage}%)`);
    }
  }
  
  
}