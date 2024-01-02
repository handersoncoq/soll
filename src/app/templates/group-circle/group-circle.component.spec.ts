import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCircleComponent } from './group-circle.component';

describe('GroupCircleComponent', () => {
  let component: GroupCircleComponent;
  let fixture: ComponentFixture<GroupCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupCircleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
