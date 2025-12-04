import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrPageComponent } from './pr-page.component';

describe('PrPageComponent', () => {
  let component: PrPageComponent;
  let fixture: ComponentFixture<PrPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
