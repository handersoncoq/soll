import { Component, Input, OnInit } from '@angular/core';
import { GroupDetail } from 'src/app/interaces/GroupDetails';

@Component({
  selector: 'app-prev-groups',
  templateUrl: './prev-groups.component.html',
  styleUrl: './prev-groups.component.scss'
})
export class PrevGroupsComponent implements OnInit {

  @Input() prevGroup!: GroupDetail;

  ngOnInit(): void {}

}
