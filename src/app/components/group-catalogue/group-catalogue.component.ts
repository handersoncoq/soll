import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { debounceTime } from 'rxjs/operators';
import { Group } from 'src/app/interaces/Group';
import { GroupService } from 'src/app/services/group-service/group.service';

@Component({
  selector: 'app-group-catalogue',
  templateUrl: './group-catalogue.component.html',
  styleUrl: './group-catalogue.component.scss'
})
export class GroupCatalogueComponent implements OnInit{

@ViewChild('groupSelect') groupSelect!: MatSelect;

groups!: Group[];
groupArrays: Group[][] = [];

searchControl = new FormControl();
filteredGroups: Group[] = [];
searchResults: Group[] = [];

noSearchResult = false;

constructor(private groupService: GroupService) {}

ngOnInit() {
  this.groups = this.groupService.getGroups();
  this.filteredGroups = this.groups;
  this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe(value => {
    this.filterGroups(value);
  });
  this.splitIntoSubArrays()
}

splitIntoSubArrays(): void {
  for (let i = 0; i < this.groups.length; i += 2) {
    const groupPair = this.groups.slice(i, i + 2);
    if (groupPair.length > 0) {
      this.groupArrays.push(groupPair);
    }
  }
}

openPanel() {
  if (this.filteredGroups.length > 0) {
    this.groupSelect.open();
  }
}

closePanel() {
  if (this.groupSelect.panelOpen) {
    this.groupSelect.close();
  }
}

onSelect(event: MatSelectChange) {
  if(!event.value) {
    this.filteredGroups = [];
    return;
  }
  this.searchControl.setValue(event.value, { emitEvent: false });
  this.searchResults = this.filterGroups(event.value);
}

setResults(){
  if(!this.searchControl.value) return;
  if(this.filteredGroups.length === 0) {
    this.searchResults = [];
    this.noSearchResult = true;
    return;
  }else{
  this.searchResults = this.filteredGroups;
  this.noSearchResult = false;
  }
  this.closePanel();
}

handleKeyUp(event: KeyboardEvent): void {
  if (event.key === 'Enter') {
    this.setResults();
  }
}

filterGroups(value: string): Group[] {
  const lowerCaseValue = value.toLowerCase().trim();
  this.filteredGroups = this.groups.filter(group =>
    group.groupName.toLowerCase().includes(lowerCaseValue)
  );
  return this.filteredGroups;
}

preventDefaultClose(event: MouseEvent) {
  event.stopPropagation();
  console.log('Button clicked, but menu stays open');
}

}
