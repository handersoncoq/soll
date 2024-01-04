import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupStrengthComponent } from './group-strength.component';

describe('GroupStrengthComponent', () => {
  let component: GroupStrengthComponent;
  let fixture: ComponentFixture<GroupStrengthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupStrengthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupStrengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
