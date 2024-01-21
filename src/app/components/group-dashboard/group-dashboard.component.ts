import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/interaces/Group';
import { GroupService } from 'src/app/services/group-service/group.service';
import { ecpsGroupStats, epsGroupStats } from 'src/app/utils/constants/GroupStats';
import { prevGroups } from 'src/app/utils/constants/PreviousGroups';
import { userGroups } from 'src/app/utils/constants/UserGroupDetail';

@Component({
  selector: 'app-group-dashboard',
  templateUrl: './group-dashboard.component.html',
  styleUrl: './group-dashboard.component.scss',
})
export class GroupDashboardComponent implements OnInit {
  
userPrevGroups: Group[] = prevGroups
group!: Group;
groupStats: any[] = [];

messageCount!: number;

constructor(private route: ActivatedRoute, private groupService: GroupService) {}

ngOnInit() {
  const routeGroupName = this.route.snapshot.paramMap.get('groupName');
    if (routeGroupName) {
      const groupName = routeGroupName.replace(/-/g, ' ');
      this.group = this.groupService.findUserGroup(groupName);
    } else {
      console.error('Group name is missing');
    }
  this.setData()
  this.messageCount = Math.floor(Math.random() * 98);
}

setData(){
  if(this.group?.payoutSystem === 'EPS') this.groupStats = epsGroupStats;
  else this.groupStats = ecpsGroupStats;
}



}
