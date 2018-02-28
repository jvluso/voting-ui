import { TestBed, inject } from '@angular/core/testing';

import { ApprovalBallotService } from './approval-ballot.service';

describe('ApprovalBallotService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApprovalBallotService]
    });
  });

  it('should be created', inject([ApprovalBallotService], (service: ApprovalBallotService) => {
    expect(service).toBeTruthy();
  }));
});
