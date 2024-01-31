import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/interaces/Group';
import { GroupService } from 'src/app/services/group-service/group.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ecpsGroupStats, epsGroupStats } from 'src/app/utils/constants/GroupStats';
import { prevGroups } from 'src/app/utils/constants/PreviousGroups';
import { userGroups } from 'src/app/utils/constants/UserGroupDetail';

@Component({
  selector: 'app-group-dashboard',
  templateUrl: './group-dashboard.component.html',
  styleUrl: './group-dashboard.component.scss'
})
export class GroupDashboardComponent implements OnInit {
  
userPrevGroups: Group[] = prevGroups
group!: Group;
groupStats: any[] = [];
groupProfilePic = '/assets/img/group-profile-1.png';
groupProfilePic2 = '/assets/img/group-profile-2.png';
isGroupActive = true;
groupProgress!: number;
messageCount!: number;

constructor(private route: ActivatedRoute, private paymentService: PaymentService,
  private groupService: GroupService) {}

ngOnInit() {
  const routeGroupName = this.route.snapshot.paramMap.get('groupName');
    if (routeGroupName) {
      const groupName = routeGroupName.replace(/-/g, ' ');
      this.group = this.groupService.findUserGroup(groupName);
    } else {
      console.info('Group name is missing');
    }

  this.setData()
  this.messageCount = Math.floor(Math.random() * 98);

  if(this.group.endDate.getTime() < new Date().getTime()){
    this.isGroupActive = false;
  }

  if(this.group.payoutSystem === 'ECPS'){
    this.groupProfilePic = this.groupProfilePic2;
  }
}

getGroupStatus(): string{
  if(!this.isGroupActive) return 'inactive';
  return 'active'
}

setData(){
  if(this.group!.payoutSystem === 'EPS') this.groupStats = epsGroupStats;
  else this.groupStats = ecpsGroupStats;
}

canMakeContribution(): boolean{
  let totalPaidMembers = this.getTotalPaidMembers();
  return totalPaidMembers < this.group.groupSize;
}

getTotalPaidMembers(): number{
  return this.group!.groupMembers.filter(
    member =>member.paidOut
    ).length
}

getGroupProgress(percent: number){
  this.groupProgress = percent;
}

makeContribution(){
  this.paymentService.openPaymentContainer()
}

onFileSelected(event: any): void {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.groupProfilePic = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

}
