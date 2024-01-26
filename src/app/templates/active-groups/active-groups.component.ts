import { Component, Input } from '@angular/core';
import { GroupDetail } from 'src/app/interaces/GroupDetails';
import { StyleManagerService } from 'src/app/services/style-manager/style-manager.service';

@Component({
  selector: 'app-active-groups',
  templateUrl: './active-groups.component.html',
  styleUrl: './active-groups.component.scss'
})
export class ActiveGroupsComponent {

  @Input() activeGroup!: GroupDetail;

  constructor(private styleManager: StyleManagerService){}

  ngOnInit(): void {}

  getPayoutSystemIcon(): string{
    return this.styleManager.getPayoutSystemIcon(this.activeGroup)
  }

}
