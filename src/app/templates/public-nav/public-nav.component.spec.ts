import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicNavComponent } from './public-nav.component';

describe('PublicNavComponent', () => {
  let component: PublicNavComponent;
  let fixture: ComponentFixture<PublicNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicNavComponent]
    });
    fixture = TestBed.createComponent(PublicNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
