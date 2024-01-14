import { Component } from '@angular/core';
import { Group } from 'src/app/interaces/Group';
import { GroupService } from 'src/app/services/group-service/group.service';

@Component({
  selector: 'app-group-catalogue',
  templateUrl: './group-catalogue.component.html',
  styleUrl: './group-catalogue.component.scss'
})
export class GroupCatalogueComponent {

trendingGroups!: Group[];
groupArrays: Group[][] = [];

constructor(private groupService: GroupService) {
  this.trendingGroups = this.groupService.getTrendingGroups();

  this.splitIntoSubArrays();
}

private splitIntoSubArrays(): void {
  for (let i = 0; i < this.trendingGroups.length; i += 2) {
    const groupPair = this.trendingGroups.slice(i, i + 2);
    if (groupPair.length > 0) {
      this.groupArrays.push(groupPair);
    }
  }
}


}
