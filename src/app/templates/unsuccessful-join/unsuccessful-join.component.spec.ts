import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsuccessfulJoinComponent } from './unsuccessful-join.component';

describe('UnsuccessfulJoinComponent', () => {
  let component: UnsuccessfulJoinComponent;
  let fixture: ComponentFixture<UnsuccessfulJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnsuccessfulJoinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnsuccessfulJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
