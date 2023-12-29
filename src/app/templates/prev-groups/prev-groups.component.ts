import { Component, Input, OnInit } from '@angular/core';
import { Group } from 'src/app/interaces/Group';

@Component({
  selector: 'app-prev-groups',
  templateUrl: './prev-groups.component.html',
  styleUrl: './prev-groups.component.scss'
})
export class PrevGroupsComponent implements OnInit {

  @Input() prevGroup!: Group;

  ngOnInit(): void {}

}
