import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Community } from 'src/app/interaces/Community';
import { Group } from 'src/app/interaces/Group';
import { User } from 'src/app/interaces/User';
import { groups } from 'src/app/utils/constants/GroupCatalog';
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
  
  userPrevGroups: Group[] = [];
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

  filterGroups(groups: Group[], filterForm: FormGroup): Group[] {
    const formValues = filterForm.value;
  
    function getDateRangeValues(rangeGroup: any): { start: Date | null, end: Date | null } {
      return {
        start: rangeGroup.startDate ? new Date(new Date(rangeGroup.startDate).setHours(0, 0, 0, 0)) : null,
        end: rangeGroup.endDate ? new Date(new Date(rangeGroup.endDate).setHours(0, 0, 0, 0)) : null
      };
    }
  
    const groupStartRange = getDateRangeValues(formValues.groupStartDateRange);
    const groupEndRange = getDateRangeValues(formValues.groupEndDateRange);
  
    return groups.filter(group => {
      let groupStartDate = group.startDate ? new Date(new Date(group.startDate).setHours(0, 0, 0, 0)) : null;
      let groupEndDate = group.endDate ? new Date(new Date(group.endDate).setHours(0, 0, 0, 0)) : null;
  
      return (formValues.savingsTarget ? group.savingsTarget === formValues.savingsTarget : true) &&
             (formValues.contribution ? group.contribution === formValues.contribution : true) &&
             (formValues.frequency ? group.frequency.toLowerCase().includes(formValues.frequency.toLowerCase()) : true) &&
             (!groupStartRange.start || (groupStartDate! >= groupStartRange.start && (!groupStartRange.end || groupStartDate! <= groupStartRange.end))) &&
             (!groupEndRange.start || (groupEndDate! >= groupEndRange.start && (!groupEndRange.end || groupEndDate! <= groupEndRange.end))) &&
             (formValues.groupSize ? group.groupSize === formValues.groupSize : true) &&
             (formValues.minReputationScore ? group.minReputationScore === formValues.minReputationScore : true) &&
             (formValues.payoutSystem ? group.payoutSystem.toLowerCase().includes(formValues.payoutSystem.toLowerCase()) : true);
    });
  }
  

  sortGroups(filteredGroups: Group[], sortForm: FormGroup) {
    const formValues = sortForm.value;
    if (!formValues || filteredGroups.length == 0) return;

    if (formValues.savingsTarget) {
      filteredGroups.sort((a, b) => b.savingsTarget - a.savingsTarget);
    }
    if (formValues.contribution) {
      filteredGroups.sort((a, b) => a.contribution - b.contribution);
    }
    if (formValues.groupSize) {
      filteredGroups.sort((a, b) => b.groupSize - a.groupSize);
    }
    if (formValues.startDate) {
      filteredGroups.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    }
    if (formValues.endDate) {
      filteredGroups.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
    }
    if (formValues.minReputationScore) {
      filteredGroups.sort((a, b) => a.minReputationScore - b.minReputationScore);
    }
  }

}
