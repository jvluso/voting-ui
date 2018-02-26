import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { interval } from 'rxjs/observable/interval';
import { Candidate } from '../classes/candidate';
import { Election } from '../classes/election';
import { ChangeDetectorRef } from '@angular/core';
import { BallotService } from '../services/ballot.service';
import { PluralityBallotService } from '../services/plurality-ballot.service';
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
    private cdRef:ChangeDetectorRef,
    private pluralityBallotService: PluralityBallotService,
    private ballotService: BallotService) { }

  ngOnInit() {
    console.log("init");
    this.address = this.route.snapshot.paramMap.get('id');
    this.refreshFields();
  }

  refreshFields(): void {
    this.getCandidates();
    this.getName();
    this.checkCanVote();
  }

  candidates: Candidate[];

  getCandidates(): void {
    this.candidates = [];
    this.ballotService.getCandidates(this.address).subscribe((res) => {
      this.candidates = res;
      this.cdRef.detectChanges();
    });
  }


  electionName: string;

  getName(): void {
    this.electionName = ""
    this.ballotService.getName(this.address).subscribe((res) => {
      this.electionName = res;
      this.cdRef.detectChanges();
    });
  }


  selectedCandidate: Candidate;

  onSelect(candidate: Candidate): void {
      this.selectedCandidate = candidate;
  }

  canVote: boolean;

  checkCanVote(): void {
    this.canVote = false;
    console.log("check");
    this.pluralityBallotService.checkCanVote(this.address).subscribe((res) => {
      this.canVote = res;
      console.log(res);
      this.cdRef.detectChanges();
    });
  }

  vote(): void {
    this.pluralityBallotService.vote(this.address,this.selectedCandidate).subscribe();
  }

}
