import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailJustificationComponent } from './email-justification.component';

describe('EmailJustificationComponent', () => {
  let component: EmailJustificationComponent;
  let fixture: ComponentFixture<EmailJustificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailJustificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailJustificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
