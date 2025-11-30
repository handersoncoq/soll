import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontPageTemplateComponent } from './front-page-template.component';

describe('FrontPageTemplateComponent', () => {
  let component: FrontPageTemplateComponent;
  let fixture: ComponentFixture<FrontPageTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontPageTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrontPageTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
