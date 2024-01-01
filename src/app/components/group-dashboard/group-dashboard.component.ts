import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/interaces/Group';
import { prevGroups } from 'src/app/utils/constants/PreviousGroups';
import { userGroups } from 'src/app/utils/constants/UserGroupDetail';

@Component({
  selector: 'app-group-dashboard',
  templateUrl: './group-dashboard.component.html',
  styleUrl: './group-dashboard.component.scss',
})
export class GroupDashboardComponent implements OnInit {
  
groupName: string | null = null;
userActiveGroups: Group[] = userGroups.map(groupDetail => ({
  groupName: groupDetail.groupName,
  payoutSystem: groupDetail.payoutSystem,
  savingsTarget: groupDetail.savingsTarget,
  groupSize: groupDetail.groupSize,
  startDate: groupDetail.startDate,
  contribution: groupDetail.contribution,
  endDate: new Date()
}));

userPrevGroups: Group[] = prevGroups
group?: Group;

constructor(private route: ActivatedRoute) {}

ngOnInit() {
  const routeGroupName = this.route.snapshot.paramMap.get('groupName');
  if (routeGroupName) {
    this.groupName = routeGroupName.toUpperCase();
    this.findGroup();
  } else {
    console.error('Group name is missing in the route parameters.');
  }
}

findGroup() {

  this.group = this.userActiveGroups.find(group => this.groupName === group.groupName);

  if (!this.group) {
    this.group = this.userPrevGroups.find(group => this.groupName === group.groupName);
  }

  if (!this.group) {
    console.error(`Group not found: ${this.groupName}`);
  }
}



}
