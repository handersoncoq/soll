import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingGroupsComponent } from './trending-groups.component';

describe('TrendingGroupsComponent', () => {
  let component: TrendingGroupsComponent;
  let fixture: ComponentFixture<TrendingGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendingGroupsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrendingGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
