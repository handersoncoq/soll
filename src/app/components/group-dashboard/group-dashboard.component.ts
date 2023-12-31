import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupDetail } from 'src/app/interaces/GroupDetails';
import { userGroups } from 'src/app/utils/constants/UserGroupDetail';

@Component({
  selector: 'app-group-dashboard',
  templateUrl: './group-dashboard.component.html',
  styleUrl: './group-dashboard.component.scss',
})
export class GroupDashboardComponent implements OnInit {
  
groupName: string | null = null;
groups: GroupDetail[] = userGroups;
group?: GroupDetail;

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
  this.group = this.groups.find(group => this.groupName === group.groupName?.toUpperCase());
  if (!this.group) {
    console.error(`Group not found: ${this.groupName}`);
  }
}


}
