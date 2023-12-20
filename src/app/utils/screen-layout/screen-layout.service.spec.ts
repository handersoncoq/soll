import { TestBed } from '@angular/core/testing';

import { ScreenLayoutService } from './screen-layout.service';

describe('ScreenLayoutService', () => {
  let service: ScreenLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
