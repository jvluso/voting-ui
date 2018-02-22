import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { Candidate } from '../classes/candidate';
import { Election } from '../classes/election';
import { BallotService } from '../services/ballot.service';
import { Web3Service } from '../web3/web3.service';

@Component({
  selector: 'app-election-details',
  templateUrl: './election-details.component.html',
  styleUrls: ['./election-details.component.css']
})
export class ElectionDetailsComponent implements OnInit {

  address: string;

  constructor(
    private web3Service: Web3Service,
    private ballotService: BallotService) { }

  ngOnInit() {
    this.ballotService.getRecentElection().then((address) => {
      this.address = address;
      this.getCandidates();
      this.getWinningCandidate();
      this.getElection();
    });

  }


  candidates: Observable<Candidate[]>;

  getCandidates(): void {
    this.candidates = this.ballotService.getCandidates(this.address);
  }


  electionName: Observable<string>;

  getElection(): void {
    this.electionName = this.ballotService.getName(this.address);
  }

  winningCandidate: string;

  getWinningCandidate(): void {
    this.ballotService.getWinningCandidate(this.address).subscribe((res) => {
      this.winningCandidate = res;
    });
  }
}
