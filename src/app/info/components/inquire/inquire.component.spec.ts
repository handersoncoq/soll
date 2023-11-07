import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquireComponent } from './inquire.component';

describe('InquireComponent', () => {
  let component: InquireComponent;
  let fixture: ComponentFixture<InquireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InquireComponent]
    });
    fixture = TestBed.createComponent(InquireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
