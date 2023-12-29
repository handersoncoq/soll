import { Component, Input, OnInit } from '@angular/core';
import { Group } from 'src/app/interaces/Group';

@Component({
  selector: 'app-trending-groups',
  templateUrl: './trending-groups.component.html',
  styleUrl: './trending-groups.component.scss'
})
export class TrendingGroupsComponent implements OnInit {

  @Input() trendingGroup!: Group;

  ngOnInit(): void {}

}
