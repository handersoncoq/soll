import { Injectable } from '@angular/core';
import { Community } from 'src/app/interaces/Community';
import { Group } from 'src/app/interaces/Group';
import { User } from 'src/app/interaces/User';
import { groups } from 'src/app/utils/constants/GroupCatalog';
import { prevGroups } from 'src/app/utils/constants/PreviousGroups';
import { trendingCommunities } from 'src/app/utils/constants/TrendingCommunities';
import { userGroups } from 'src/app/utils/constants/UserGroupDetail';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  userActiveGroups: Group[] = userGroups.map(groupDetail => ({
    groupName: groupDetail.groupName,
    groupLocation: groupDetail.groupLocation,
    payoutSystem: groupDetail.payoutSystem,
    savingsTarget: groupDetail.savingsTarget,
    groupSize: groupDetail.groupSize,
    startDate: groupDetail.startDate,
    contribution: groupDetail.contribution,
    frequency: groupDetail.frequency,
    nextContribution: groupDetail.nextContributionDate,
    endDate: groupDetail.endDate,
    isActive: groupDetail.isActive,
    groupMembers: groupDetail.groupMembers,
    groupLeader: groupDetail.groupLeader,
    minReputationScore: 80,
    cycle: groupDetail.cycle
  }));
  
  userPrevGroups: Group[] = prevGroups
  trendingCommunities: Community[] = [];  

  
foundGroup!: Group;

  constructor() { }

getUserActiveGroups(): Group[]{
  return this.userActiveGroups;
}

getUserPreviousGroups(): Group[]{
  return this.userPrevGroups;
}

  findUserGroup(groupName: string): Group{
    let lowerCaseName = groupName.toLowerCase();
    this.foundGroup = this.userActiveGroups.find(
      group => lowerCaseName === group.groupName.toLowerCase()
      )!;
    if (!this.foundGroup) {
      this.foundGroup = this.userPrevGroups.find(
        group => lowerCaseName === group.groupName.toLowerCase()
        )!;
    }
    return this.foundGroup;
  }

  findAnyGroup(groupName: string): Group{
    return groups.find(group => 
      groupName.toLowerCase() === group.groupName.toLowerCase()
      )!;

  }

  getGroupProfileRoute(groupName: string): string {
    let formattedName = this.formatGroupName(groupName);
    return `/group/${formattedName}/profile`;
  }

  getGroupDashboardRoute(groupName: string, cycleNumber: number): string {
    let formattedName = this.formatGroupName(groupName);
    return `/group/${formattedName}/cycle/${cycleNumber}/dashboard`;
  }

  formatGroupName(groupName: string): string{
    return groupName.replace(/\s+/g, '-').toLowerCase()
  }

  canUserJoinGroup(user: User, group: Group): boolean {
    let userLocation = user.address, userRepScore = user.reputationScore;
    return userLocation === group.groupLocation && userRepScore >= group.minReputationScore;
  }
  


  getTrendingGroups(): Group[]{
    return [
      groups[0],
      groups[2],
      groups[4],
      groups[6],
      groups[8],
    ];
  }

  getGroups(): Group[]{
    return groups;
  }

  getTrendingCommunities(): Community[]{
    this.trendingCommunities = trendingCommunities;
    return this.trendingCommunities;
  }
}
