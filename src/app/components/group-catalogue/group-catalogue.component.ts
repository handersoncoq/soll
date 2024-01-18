import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Group } from 'src/app/interaces/Group';
import { GroupService } from 'src/app/services/group-service/group.service';

@Component({
  selector: 'app-group-catalogue',
  templateUrl: './group-catalogue.component.html',
  styleUrl: './group-catalogue.component.scss'
})
export class GroupCatalogueComponent implements OnInit, OnDestroy{

@ViewChild('groupSelect') groupSelect!: MatSelect;
private destroy$ = new Subject<void>();

groups!: Group[];
groupArrays: Group[][] = [];

searchControl = new FormControl();
filteredGroups: Group[] = [];
searchResults: Group[] = [];

noSearchResult = false;

constructor(private groupService: GroupService) {
  this.searchControl.valueChanges.pipe(
    debounceTime(300),
    takeUntil(this.destroy$)
  ).subscribe(value => {
    if(value && value.trim() !== ''){
      this.filterGroups(value);
      setTimeout(() => this.openPanel(), 0);
    }else {
      this.resetAll();
    }
  });
}


ngOnInit() {
  this.groups = this.groupService.getGroups();
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
  
  if(!this.searchControl.value || this.searchControl.value.trim() === '') {
    this.searchResults = [];
    return;
  }
    
  this.filterGroups(this.searchControl.value);
     
  if(this.filteredGroups.length === 0) {
    this.noSearchResult = true;
  }else {
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

  if(this.filteredGroups.length !== 0) this.noSearchResult = false;
  
  return this.filteredGroups;
}

resetAll(){
  this.searchResults = [];
  this.noSearchResult = false; // Do not be confused! This does not mean there was search result, 
  this.closePanel();            // but rather, it justs resets everything
}

preventDefaultClose(event: MouseEvent) {
  event.stopPropagation();
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}


}
