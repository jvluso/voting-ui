import { TestBed, inject } from '@angular/core/testing';

import { PluralityBallotService } from './plurality-ballot.service';

describe('PluralityBallotService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PluralityBallotService]
    });
  });

  it('should be created', inject([PluralityBallotService], (service: PluralityBallotService) => {
    expect(service).toBeTruthy();
  }));
});
