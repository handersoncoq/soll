import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneAgreementComponent } from './phone-agreement.component';

describe('PhoneAgreementComponent', () => {
  let component: PhoneAgreementComponent;
  let fixture: ComponentFixture<PhoneAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneAgreementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhoneAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
