import { TestBed } from '@angular/core/testing';

import { ContentManagerService } from './content-manager.service';

describe('ContentManagerService', () => {
  let service: ContentManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
