import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndConditionsRouteComponent } from './terms-and-conditions-route.component';

describe('TermsAndConditionsRouteComponent', () => {
  let component: TermsAndConditionsRouteComponent;
  let fixture: ComponentFixture<TermsAndConditionsRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsAndConditionsRouteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TermsAndConditionsRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
