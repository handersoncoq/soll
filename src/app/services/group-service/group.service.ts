import { Injectable } from '@angular/core';
import { Community } from 'src/app/interaces/Community';
import { Group } from 'src/app/interaces/Group';
import { prevGroups } from 'src/app/utils/constants/PreviousGroups';
import { trendingCommunities } from 'src/app/utils/constants/TrendingCommunities';
import { trendingGroups } from 'src/app/utils/constants/TrendingGroups';
import { userGroups } from 'src/app/utils/constants/UserGroupDetail';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  userActiveGroups: Group[] = userGroups.map(groupDetail => ({
    groupName: groupDetail.groupName,
    payoutSystem: groupDetail.payoutSystem,
    savingsTarget: groupDetail.savingsTarget,
    groupSize: groupDetail.groupSize,
    startDate: groupDetail.startDate,
    contribution: groupDetail.contribution,
    nextContribution: groupDetail.nextContributionDate,
    endDate: groupDetail.endDate,
    isActive: groupDetail.isActive,
    groupMembers: groupDetail.groupMembers,
    groupLeader: groupDetail.groupLeader
  }));
  
  userPrevGroups: Group[] = prevGroups
  trendingGroups: Group[] = [];
  trendingCommunities: Community[] = [];
  
  
  foundGroup!: Group;

  constructor() { }

  findUserGroup(groupName: string): Group{
    this.foundGroup = this.userActiveGroups.find(group => groupName === group.groupName)!;
    if (!this.foundGroup) {
      this.foundGroup = this.userPrevGroups.find(group => groupName === group.groupName)!;
    }
    return this.foundGroup;
  }

  findAnyGroup(groupName: string): Group{
    return trendingGroups.find(group => groupName === group.groupName)!;

  }

  getTrendingGroups(): Group[]{
    this.trendingGroups = trendingGroups;
    return this.trendingGroups;
  }

  getGroups(): Group[]{
    return trendingGroups;
  }

  getTrendingCommunities(): Community[]{
    this.trendingCommunities = trendingCommunities;
    return this.trendingCommunities;
  }
}
