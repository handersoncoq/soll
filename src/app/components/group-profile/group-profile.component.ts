import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/interaces/Group';
import { GroupMember } from 'src/app/interaces/GroupMember';
import { DialogService } from 'src/app/services/dialog-service/dialog.service';
import { GroupService } from 'src/app/services/group-service/group.service';

@Component({
  selector: 'app-group-profile',
  templateUrl: './group-profile.component.html',
  styleUrl: './group-profile.component.scss'
})
export class GroupProfileComponent implements OnInit{

  groupName!: string;
  group!: Group;
  joinWarning = 'Before joining this group, please make sure you have read and understood the group\'s Rules and Guidelines.';

  constructor(private route: ActivatedRoute, private dialogService: DialogService,
    private groupService: GroupService) {}

  ngOnInit() {
    const routeGroupName = this.route.snapshot.paramMap.get('groupName');
    if (routeGroupName) {
      this.groupName = routeGroupName.toUpperCase();
      this.group = this.groupService.findAnyGroup(this.groupName)
    } else {
      console.error('Group name is missing');
    }
  }

  joinGroup() {
    const buttonClickCallback = () => {
      console.log('You have joined', this.groupName);
    };

    this.dialogService.openGroupDialog(
      this.groupName,
      this.joinWarning,
      buttonClickCallback
      );
  }

  isOpen(): boolean {
    return this.group.groupMembers.length < this.group.groupSize;
  }
  

}
