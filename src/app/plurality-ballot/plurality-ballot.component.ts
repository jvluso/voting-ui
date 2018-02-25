import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { interval } from 'rxjs/observable/interval';
import { Candidate } from '../classes/candidate';
import { Election } from '../classes/election';
import { BallotService } from '../services/ballot.service';
import { Web3Service } from '../web3/web3.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plurality-ballot',
  templateUrl: './plurality-ballot.component.html',
  styleUrls: ['./plurality-ballot.component.css']
})
export class PluralityBallotComponent implements OnInit {
  address: string;

  constructor(
    private route: ActivatedRoute,
    private web3Service: Web3Service,
    private ballotService: BallotService) { }

  ngOnInit() {
    this.address = this.route.snapshot.paramMap.get('id');
    this.refreshFields();
  }

  refreshFields(): void {
    this.getCandidates();
    this.getName();
    this.checkCanVote();
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
