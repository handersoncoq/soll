import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/interaces/Group';
import { GroupMember } from 'src/app/interaces/GroupMember';
import { DialogService } from 'src/app/services/dialog-service/dialog.service';
import { GroupService } from 'src/app/services/group-service/group.service';
import { SnackBarComponent } from 'src/app/templates/snack-bar/snack-bar.component';

@Component({
  selector: 'app-group-profile',
  templateUrl: './group-profile.component.html',
  styleUrl: './group-profile.component.scss'
})
export class GroupProfileComponent implements OnInit{

  groupName!: string;
  group!: Group;
  joinWarning = 'Before joining this group, please make sure you have read and understood the group\'s Rules and Guidelines.';
  joinSuccess = 'You have successfully join '

  constructor(private route: ActivatedRoute, private dialogService: DialogService,
    private groupService: GroupService, private snackBar: MatSnackBar,) {}

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
      this.sendJoinSuccess();
    };

    this.dialogService.openGroupDialog(
      this.groupName,
      this.joinWarning,
      buttonClickCallback
      );
  }

  sendJoinSuccess(){
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        message: this.joinSuccess + this.groupName,
        type: 'success'
      },
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  isOpen(): boolean {
    return this.group.groupMembers.length < this.group.groupSize;
  }
  

}
