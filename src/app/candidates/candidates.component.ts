import { Component, OnInit } from '@angular/core';

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
  election: Election;

  constructor(
    private web3Service: Web3Service,
    private ballotService: BallotService) { }

  ngOnInit() {

    this.election = this.ballotService.getNullElection();
    this.ballotService.getRecentElection().then((election) => {
      this.election = election;
      this.getCandidates();
      this.checkCanVote();
    });
  }

  getCandidates(): void {
    this.ballotService.getCandidates(this.election);
  }


  selectedCandidate: Candidate;

  onSelect(candidate: Candidate): void {
      this.selectedCandidate = candidate;
  }

  canVote: boolean;

  checkCanVote(): void {
      this.ballotService.checkCanVote(this.election).then((res) => {
        console.log(res);
        this.canVote = res;
      });
  }

  vote(): void {
      this.ballotService.vote(this.election,this.selectedCandidate).then((res) => {
        console.log(res);
        this.canVote = res;
      });
  }

}
