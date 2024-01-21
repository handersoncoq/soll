import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/interaces/Group';
import { User } from 'src/app/interaces/User';
import { ContentManagerService } from 'src/app/services/content-manager/content-manager.service';
import { DialogService } from 'src/app/services/dialog-service/dialog.service';
import { GroupService } from 'src/app/services/group-service/group.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { SnackBarComponent } from 'src/app/templates/snack-bar/snack-bar.component';

@Component({
  selector: 'app-group-profile',
  templateUrl: './group-profile.component.html',
  styleUrl: './group-profile.component.scss'
})
export class GroupProfileComponent implements OnInit{

  group!: Group;
  joinWarning = 'Before joining this group, please make sure you have read and understood the group\'s Rules and Guidelines.';
  joinSuccessMsg = 'You have successfully join ';
  joinErrorMsg = 'Sorry, you cannot join this group at this time.';
  currentUser: User;

  constructor(private route: ActivatedRoute, private dialogService: DialogService, private contentManager: ContentManagerService,
    private groupService: GroupService, private snackBar: MatSnackBar, private userService: UserService) {
      this.currentUser = this.userService.getCurrentUser();
    }

  ngOnInit() {
    const routeGroupName = this.route.snapshot.paramMap.get('groupName');
    if (routeGroupName) {
      const groupName = routeGroupName.replace(/-/g, ' ');
      this.group = this.groupService.findAnyGroup(groupName);
    } else {
      console.error('Group name is missing');
    }
  }

  joinGroup() {

    if(!this.isOpen()) return;
    if(!this.canJoin(this.currentUser, this.group)){
      this.sendJoinErrorMsg();
      return;
    }

    const buttonClickCallback = () => {
      this.sendJoinSuccessMsg();
    };

    this.dialogService.openGroupDialog(
      this.group.groupName,
      this.joinWarning,
      buttonClickCallback
      );
  }

  sendJoinSuccessMsg(){
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        message: this.joinSuccessMsg + this.group.groupName,
        type: 'success'
      },
      panelClass: 'app-snackbar-success',
    });
  }

  sendJoinErrorMsg(){
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        message: this.joinErrorMsg,
        type: 'error',
        learnMore: ()=> this.contentManager.openUnsuccessfulJoin()
      },
      panelClass: 'app-snackbar-error',
    });
  }

  canJoin(user: User, group: Group): boolean{
    return this.groupService.canUserJoinGroup(user, group);
  }

  isOpen(): boolean {
    return this.group.groupMembers.length < this.group.groupSize;
  }
  

}
