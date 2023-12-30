import { Component, Input } from '@angular/core';
import { GroupDetail } from 'src/app/interaces/GroupDetails';

@Component({
  selector: 'app-active-groups',
  templateUrl: './active-groups.component.html',
  styleUrl: './active-groups.component.scss'
})
export class ActiveGroupsComponent {

  @Input() activeGroup!: GroupDetail;

}
