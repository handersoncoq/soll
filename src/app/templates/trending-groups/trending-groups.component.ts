import { Component, Input, OnInit } from '@angular/core';
import { Group } from 'src/app/interaces/Group';
import { StyleManagerService } from 'src/app/services/style-manager/style-manager.service';

@Component({
  selector: 'app-trending-groups',
  templateUrl: './trending-groups.component.html',
  styleUrl: './trending-groups.component.scss'
})
export class TrendingGroupsComponent implements OnInit {

  @Input() trendingGroup!: Group;

  constructor(private styleManager: StyleManagerService){}

  ngOnInit(): void {}

  getPayoutSystemIcon(): string{
    return this.styleManager.getPayoutSystemIcon(this.trendingGroup)
  }

}
