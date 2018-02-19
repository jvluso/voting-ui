import { TestBed, inject } from '@angular/core/testing';

import { Web3ReferenceService } from './web3-reference.service';

describe('Web3ReferenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Web3ReferenceService]
    });
  });

  it('should be created', inject([Web3ReferenceService], (service: Web3ReferenceService) => {
    expect(service).toBeTruthy();
  }));
});
