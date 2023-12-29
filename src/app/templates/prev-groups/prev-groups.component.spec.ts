import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevGroupsComponent } from './prev-groups.component';

describe('PrevGroupsComponent', () => {
  let component: PrevGroupsComponent;
  let fixture: ComponentFixture<PrevGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrevGroupsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrevGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
