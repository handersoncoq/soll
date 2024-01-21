import { Injectable } from '@angular/core';
import { User } from 'src/app/interaces/User';
import { userGroups } from 'src/app/utils/constants/UserGroupDetail';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser!: User;
  userProfilePic = '/assets/img/profile.png';

 getCurrentUser(): User{
  this.currentUser = {
    firstName: 'Matgomory',
    lastName: 'Ckan',
    address:'Hartford, CT',
    profilePic: this.userProfilePic,
    reputationScore: 90,
    totalSavings: 12000,
    groups: userGroups,
  }
  return this.currentUser 
 }

}
