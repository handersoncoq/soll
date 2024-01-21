import { Component, Input, OnInit } from '@angular/core';
import { Group } from 'src/app/interaces/Group';

@Component({
  selector: 'app-group-layout',
  templateUrl: './group-layout.component.html',
  styleUrl: './group-layout.component.scss'
})
export class GroupLayoutComponent implements OnInit {

  @Input() group!: Group;

  ngOnInit(): void {}

}
