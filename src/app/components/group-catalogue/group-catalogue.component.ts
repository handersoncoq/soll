import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
filterForm!: FormGroup;
sortForm!: FormGroup;

groupStartDateRange!: FormGroup;
groupEndDateRange!: FormGroup;

constructor(private groupService: GroupService) {
  this.searchControl.valueChanges.pipe(
    debounceTime(300),
    takeUntil(this.destroy$)
  ).subscribe(value => {
    if(value && value.trim() !== ''){
      this.searchGroup(value);
      setTimeout(() => this.openPanel(), 0);
    }else {
      this.resetAll();
    }
  });
}


ngOnInit() {
  this.groups = this.groupService.getGroups();
  this.groupArrays = this.groupByCity(this.groups);
  this.createStartAndEndDateRange();
  this.createFilterForm();
  this.createSortForm();
}

createStartAndEndDateRange(){
  this.groupStartDateRange = new FormGroup({
    startDate: new FormControl(null),
    endDate: new FormControl(null)
  });
  this.groupEndDateRange = new FormGroup({
    startDate: new FormControl(null),
    endDate: new FormControl(null)
  })
}

createFilterForm() {
  this.filterForm = new FormGroup({
    savingsTarget: new FormControl(null),
    contribution: new FormControl(null),
    frequency: new FormControl(null),
    groupStartDateRange: this.groupStartDateRange,
    groupEndDateRange: this.groupEndDateRange,
    groupSize: new FormControl(null),
    payoutSystem: new FormControl(null),
    minReputationScore: new FormControl(null)
  });
}


createSortForm() {
  this.sortForm = new FormGroup({
    savingsTarget: new FormControl(false),
    contribution: new FormControl(false),
    startDate: new FormControl(false),
    endDate: new FormControl(false),
    groupSize: new FormControl(false),
    minReputationScore: new FormControl(false)
  });
}

groupByCity(groups: any[]): any[] {
  const grouped = groups.reduce((accumulator, group) => {
    const key = group.groupLocation;
    if (!accumulator[key]) {
      accumulator[key] = [];
    }
    accumulator[key].push(group);
    return accumulator;
  }, {});

  return Object.values(grouped);
}

getGroupProfileRoute(groupName: string): string {
  return this.groupService.getGroupProfileRoute(groupName);
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
  this.searchResults = this.searchGroup(event.value);
}

setResults(){
  if(!this.searchControl.value || this.searchControl.value.trim() === '') {
    this.searchResults = [];
    return;
  }
    
  this.searchGroup(this.searchControl.value);
  this.updateSearchResultVariable();
  this.closePanel();
}

updateSearchResultVariable(){
  if(this.filteredGroups.length === 0) {
    this.noSearchResult = true;
  }else {
    this.searchResults = this.filteredGroups;
    this.noSearchResult = false;
  }
}

handleKeyUp(event: KeyboardEvent): void {
  if (event.key === 'Enter') {
    this.setResults();
  }
}

handleSubmit(event: Event): void {
  event.preventDefault();
}


searchGroup(value: string): Group[] {
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

updateSearchResultArray(){
  if(this.filteredGroups.length !== 0)
  this.searchResults = this.filteredGroups;
}

hasRealValue = (obj: any): boolean => {
  for (const key in obj) {
    const value = obj[key];
    if (value instanceof Date) {
      return true;
    } else if (typeof value === 'object' && value !== null) {
      if (value.startDate || value.endDate) {
        return true;
      } else if (this.hasRealValue(value)) {
        return true;
      }
    } else if (value !== null && value !== '') {
      return true;
    }
  }
  return false;
};

applyFilter() {
  const formValues = this.filterForm.value;
  if (!this.hasRealValue(formValues)) return;
  this.filteredGroups = this.groupService.filterGroups(this.groups, this.filterForm);
  this.updateSearchResultArray();
  this.updateSearchResultVariable();
}


applySort() {
  this.groupService.sortGroups(
    this.filteredGroups, this.sortForm
  );
}


clearFilter(event: MouseEvent){
  this.filterForm.reset();
  this.resetAll();
  this.preventDefaultClose(event)
}

clearSort(event: MouseEvent) {
  this.sortForm.reset();
  this.applyFilter();
  this.preventDefaultClose(event)
}

getResultsData(): string{
  if(this.searchResults.length == 1) return '1 group'
  return `${this.searchResults.length} groups`
}

}
