import { Component, Input, OnInit } from '@angular/core';
import { Group } from 'src/app/interaces/Group';
import { StyleManagerService } from 'src/app/services/style-manager/style-manager.service';

@Component({
  selector: 'app-group-layout',
  templateUrl: './group-layout.component.html',
  styleUrl: './group-layout.component.scss'
})
export class GroupLayoutComponent implements OnInit {

  @Input() group!: Group;

  constructor(private styleManager: StyleManagerService){}

  ngOnInit(): void {}

  getPayoutSystemIcon(): string{
    return this.styleManager.getPayoutSystemIcon(this.group)
  }

}
