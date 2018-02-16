import { Component, OnInit } from '@angular/core';

import { Candidate } from '../candidate';
import { BallotService } from '../ballot.service';

@Component({
  selector: 'app-election-details',
  templateUrl: './election-details.component.html',
  styleUrls: ['./election-details.component.css']
})
export class ElectionDetailsComponent implements OnInit {
  candidates: Candidate[];

  constructor(private ballotService: BallotService) { }

  ngOnInit() {
    this.getCandidates();
    this.getWinningCandidate();
  }

  getCandidates(): void {
    this.ballotService.getCandidates()
      .subscribe({
        next: candidates => {
          this.candidates = candidates;
        },
        error: err => console.log(err),
      });
  }


  winningCandidate: string;

  getWinningCandidate(): void {
    console.log("requestWinningCandidate");
      this.ballotService.getWinningCandidate().then((res) => {
        console.log("getWinningCandidate");
        console.log(res);
        this.winningCandidate = res;
      });
  }
}
