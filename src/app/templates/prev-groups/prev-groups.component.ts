import { Component, Input, OnInit } from '@angular/core';
import { GroupDetail } from 'src/app/interaces/GroupDetails';
import { StyleManagerService } from 'src/app/services/style-manager/style-manager.service';

@Component({
  selector: 'app-prev-groups',
  templateUrl: './prev-groups.component.html',
  styleUrl: './prev-groups.component.scss'
})
export class PrevGroupsComponent implements OnInit {

  @Input() prevGroup!: GroupDetail;

  constructor(private styleManager: StyleManagerService){}

  ngOnInit(): void {}

  getPayoutSystemIcon(): string{
    return this.styleManager.getPayoutSystemIcon(this.prevGroup)
  }

}
