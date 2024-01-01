import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Community } from 'src/app/interaces/Community';
import { Group } from 'src/app/interaces/Group';
import { GroupDetail } from 'src/app/interaces/GroupDetails';
import { prevGroups } from 'src/app/utils/constants/PreviousGroups';
import { trendingCommunities } from 'src/app/utils/constants/TrendingCommunities';
import { trendingGroups } from 'src/app/utils/constants/TrendingGroups';
import { userGroups } from 'src/app/utils/constants/UserGroupDetail';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  
  profilePic = '/assets/img/profile.png';

  firstName = 'Matgomory';
  lastName = 'Creast';
  useShortenedName = '';
  userReputation = 85;
  activeGroupCount = 2;
  location = 'Hartford, CT';
  currentSaving = 12000;

  activeGroups: GroupDetail[] = userGroups.sort((a, b) => {
    const dateA = new Date(a.nextContributionDate).getTime();
    const dateB = new Date(b.nextContributionDate).getTime();
    return dateA - dateB;
  });
  
  nextPayoutDate!: Date | null;
  daysUntilPayout!: number | null;

  inboxCount = 2;

  prevGroups: Group[] = prevGroups
  trendingGroups: Group[] = trendingGroups;
  trendingCommunities: Community[] = trendingCommunities

  constructor(private router: Router) {
    this.nextPayoutDate = this.determineEarliestPayoutDate();
  }
  

  ngOnInit(): void {
    register()
    this.shortenName(this.firstName, this.lastName);
    this.calculateDaysUntilPayout()
  }

  shortenName(firstName: string, lastName: string) {
    let treatedFName = firstName;
    let treatedLName = lastName.substring(0, 1);
    if (firstName.length >= 12) {
        treatedFName = firstName.substring(0, 8).concat('...');
        this.useShortenedName = `${treatedFName} ${treatedLName}.`;
    } else {
        this.useShortenedName = `${treatedFName} ${treatedLName}.`;
    }
}

calculateNextPayoutDate(group: GroupDetail): Date {
  if(group.payoutSystem === 'EPS'){
    const cycleStartDate = new Date(group.startDate);
    const firstPayoutDate = new Date(cycleStartDate.getTime() + 4 * 7 * 24 * 60 * 60 * 1000);
    return new Date(firstPayoutDate.getTime() + (group.rank - 1) * 2 * 7 * 24 * 60 * 60 * 1000);
  }
 
  return group.endDate;
}

calculateDaysUntilPayout(){
  const today = new Date();
  const diffInMilliseconds = this.nextPayoutDate!.getTime() - today.getTime();
  const diffInDays = Math.ceil(diffInMilliseconds / (24 * 60 * 60 * 1000));
  if(diffInDays <= 0){
    this.daysUntilPayout = null;
  }else 
    this.daysUntilPayout = diffInDays;
}

determineEarliestPayoutDate(): Date | null{
  let earliestNextPayoutDate: Date | null = null;
  const currentDate = new Date();
  userGroups.forEach(group => {
    let groupNextPayoutDate = this.calculateNextPayoutDate(group);
    if (groupNextPayoutDate > currentDate) {
      if (!earliestNextPayoutDate || groupNextPayoutDate < earliestNextPayoutDate) {
        earliestNextPayoutDate = groupNextPayoutDate;
      }
    }
  });

  return earliestNextPayoutDate;
}



goToGroupDashboard(groupName: string) {
  this.router.navigate(['/group', groupName.toLowerCase()]);
}

  
}
