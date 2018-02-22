import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { Candidate } from '../classes/candidate';
import { Election } from '../classes/election';
import { BallotService } from '../services/ballot.service';
import { Web3Service } from '../web3/web3.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {
  address: string;

  constructor(
    private web3Service: Web3Service,
    private ballotService: BallotService) { }

  ngOnInit() {

    this.ballotService.getRecentElection().then((address) => {
      this.address = address;
      this.getCandidates();
      this.getName();
      this.checkCanVote();
    });
  }

  candidates: Observable<Candidate[]>;

  getCandidates(): void {
    this.candidates = this.ballotService.getCandidates(this.address);
  }


  electionName: Observable<string>;

  getName(): void {
    this.electionName = this.ballotService.getName(this.address);
  }


  selectedCandidate: Candidate;

  onSelect(candidate: Candidate): void {
      this.selectedCandidate = candidate;
  }

  canVote: Observable<boolean>;

  checkCanVote(): void {
    this.canVote = this.ballotService.checkCanVote(this.address);
  }

  vote(): void {
    this.ballotService.vote(this.address,this.selectedCandidate).subscribe();
  }

}
