import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptOverviewComponent } from './concept-overview.component';

describe('ConceptOverviewComponent', () => {
  let component: ConceptOverviewComponent;
  let fixture: ComponentFixture<ConceptOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConceptOverviewComponent]
    });
    fixture = TestBed.createComponent(ConceptOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
