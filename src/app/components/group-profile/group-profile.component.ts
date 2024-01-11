import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/interaces/Group';
import { GroupService } from 'src/app/services/group-service/group.service';

@Component({
  selector: 'app-group-profile',
  templateUrl: './group-profile.component.html',
  styleUrl: './group-profile.component.scss'
})
export class GroupProfileComponent implements OnInit{

  groupName!: string;
  group!: Group;

  constructor(private route: ActivatedRoute, private groupService: GroupService) {}

  ngOnInit() {
    const routeGroupName = this.route.snapshot.paramMap.get('groupName');
    if (routeGroupName) {
      this.groupName = routeGroupName.toUpperCase();
      this.group = this.groupService.findAnyGroup(this.groupName)
    } else {
      console.error('Group name is missing');
    }
  }

}
