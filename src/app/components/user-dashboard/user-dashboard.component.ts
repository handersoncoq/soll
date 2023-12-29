import { Component, OnInit } from '@angular/core';
import { GroupDetail } from 'src/app/interaces/GroupDetails';
import { prevGroups } from 'src/app/utils/constants/PreviousGroups';
import { trendingGroups } from 'src/app/utils/constants/TrendingGroups';
import { userGroups } from 'src/app/utils/constants/UserGroupDetail';
import { ScreenLayoutService } from 'src/app/utils/screen-layout/screen-layout.service';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {

  isMobile = true;
  
  profilePic = '/assets/img/profile.png';

  userReputation = 85;
  activeGroupCount = 2;
  location = 'Hartford, CT';
  currentSaving = 12000;

  activeGroups: GroupDetail[] = userGroups;
  nextPayoutDate: Date;
  daysUntilPayout = 0;
  daysToAdd = 55;

  prevGroups = prevGroups
  trendingGroups = trendingGroups;

  constructor(private screenService: ScreenLayoutService) {
    this.nextPayoutDate = new Date(
      this.activeGroups[0].cycleStartDate.getTime() +
        this.daysToAdd * 24 * 60 * 60 * 1000
    );
  }

  ngOnInit(): void {
    this.screenService.isMobile$.subscribe(
      isMobile =>{
        this.isMobile = isMobile;
      }
    );
    register()
  }
  
}
