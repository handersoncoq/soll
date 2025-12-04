import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialShuffleComponent } from './testimonial-shuffle.component';

describe('TestimonialShuffleComponent', () => {
  let component: TestimonialShuffleComponent;
  let fixture: ComponentFixture<TestimonialShuffleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialShuffleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestimonialShuffleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
