import { Component, OnInit } from '@angular/core';

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
  election: Election;

  constructor(
    private web3Service: Web3Service,
    private ballotService: BallotService) { }

  ngOnInit() {
    this.election = this.ballotService.getNullElection();
    this.ballotService.getRecentElection().then((election) => {
      this.election = election;
      this.getCandidates();
      this.getWinningCandidate();
      this.getElection();
    });

  }

  getCandidates(): void {
    this.ballotService.getCandidates(this.election).subscribe();
  }

  getElection(): void {
    this.ballotService.getName(this.election).subscribe();
  }

  winningCandidate: string;

  getWinningCandidate(): void {
    console.log("requestWinningCandidate");
    this.ballotService.getWinningCandidate(this.election).subscribe((res) => {
      console.log("getWinningCandidate");
      console.log(res);
      this.winningCandidate = res;
    });
  }
}
