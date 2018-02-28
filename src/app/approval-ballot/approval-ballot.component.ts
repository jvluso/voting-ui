import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { interval } from 'rxjs/observable/interval';
import { Candidate } from '../classes/candidate';
import { Election } from '../classes/election';
import { ChangeDetectorRef } from '@angular/core';
import { BallotService } from '../services/ballot.service';
import { ApprovalBallotService } from '../services/approval-ballot.service';
import { Web3Service } from '../web3/web3.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-approval-ballot',
  templateUrl: './approval-ballot.component.html',
  styleUrls: ['./approval-ballot.component.css']
})
export class ApprovalBallotComponent implements OnInit {
  address: string;
  subscriptions: any;

  constructor(
    private route: ActivatedRoute,
    private web3Service: Web3Service,
    private cdRef:ChangeDetectorRef,
    private approvalBallotService: ApprovalBallotService,
    private ballotService: BallotService) { }

  ngOnInit() {
    console.log("init");
    this.address = this.route.snapshot.paramMap.get('id');
    this.refreshFields();
  }

  ngOnDestroy() {
    while(this.subscriptions.length>0){
      this.subscriptions.pop().unsubscribe();
    }
  }

  refreshFields(): void {
    this.selectedCandidates = {};
    this.length=0;
    this.subscriptions = [];
    this.getCandidates();
    this.getName();
    this.checkCanVote();
  }

  candidates: Candidate[];

  getCandidates(): void {
    this.candidates = [];
    this.subscriptions.push(this.ballotService.getCandidates(this.address).subscribe((res) => {
      this.candidates = res;
      this.length++;
      this.cdRef.detectChanges();
    }));
  }


  electionName: string;

  getName(): void {
    this.electionName = ""
    console.log("name");
    this.subscriptions.push(this.ballotService.getName(this.address).subscribe((res) => {
      this.electionName = res;
      this.cdRef.detectChanges();
    }));
  }


  selectedCandidates: any;
  length: number;

  onSelect(candidate: Candidate): void {
    console.log(candidate.id)
    console.log(this.selectedCandidates[candidate.id])
      if(this.selectedCandidates[candidate.id]){
        this.selectedCandidates[candidate.id] = false;
      }else{
        this.selectedCandidates[candidate.id] = true;
      }
      this.cdRef.detectChanges();
  }

  canVote: boolean;

  checkCanVote(): void {
    this.canVote = false;
    console.log("check");
    this.subscriptions.push(this.approvalBallotService.checkCanVote(this.address).subscribe((res) => {
      this.canVote = res;
      this.cdRef.detectChanges();
    }));
  }

  vote(): void {
    this.approvalBallotService.vote(this.address,this.length,this.selectedCandidates).subscribe();
  }

}
