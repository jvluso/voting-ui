import { TestBed, inject } from '@angular/core/testing';

import { Web3ContractService } from './web3-contract.service';

describe('Web3ContractService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Web3ContractService]
    });
  });

  it('should be created', inject([Web3ContractService], (service: Web3ContractService) => {
    expect(service).toBeTruthy();
  }));
});
