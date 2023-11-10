import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTemplateComponent } from './info-template.component';

describe('InfoTemplateComponent', () => {
  let component: InfoTemplateComponent;
  let fixture: ComponentFixture<InfoTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoTemplateComponent]
    });
    fixture = TestBed.createComponent(InfoTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
