import { TestBed } from '@angular/core/testing';

import { PublicInteractionService } from './public-interaction.service';

describe('PublicInteractionService', () => {
  let service: PublicInteractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicInteractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
