import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/interaces/Group';
import { GroupMember } from 'src/app/interaces/GroupMember';
import { activeEcpsGroupMembers, activeEpsGroupMembers } from 'src/app/utils/constants/GroupMembers';
import { ecpsGroupStats, epsGroupStats } from 'src/app/utils/constants/GroupStats';
import { prevGroups } from 'src/app/utils/constants/PreviousGroups';
import { userGroups } from 'src/app/utils/constants/UserGroupDetail';

@Component({
  selector: 'app-group-dashboard',
  templateUrl: './group-dashboard.component.html',
  styleUrl: './group-dashboard.component.scss',
})
export class GroupDashboardComponent implements OnInit {
  
groupName: string | null = null;
userGroups: Group[] = userGroups.map(groupDetail => ({
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
group?: Group;
groupStats: any[] = [];

messageCount!: number;

constructor(private route: ActivatedRoute) {}

ngOnInit() {
  const routeGroupName = this.route.snapshot.paramMap.get('groupName');
  if (routeGroupName) {
    this.groupName = routeGroupName.toUpperCase();
    this.findGroup();
  } else {
    console.error('Group name is missing');
  }
  this.setData()
  this.messageCount = Math.floor(Math.random() * 98);
}

findGroup() {
  this.group = this.userGroups.find(group => this.groupName === group.groupName);
  if (!this.group) {
    this.group = this.userPrevGroups.find(group => this.groupName === group.groupName);
  }
  if (!this.group) {
    console.error(`Group not found: ${this.groupName}`);
  }
}

setData(){
  if(this.group?.payoutSystem === 'EPS') this.groupStats = epsGroupStats;
  else this.groupStats = ecpsGroupStats;
}



}
