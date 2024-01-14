import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCatalogueComponent } from './group-catalogue.component';

describe('GroupCatalogueComponent', () => {
  let component: GroupCatalogueComponent;
  let fixture: ComponentFixture<GroupCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupCatalogueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
