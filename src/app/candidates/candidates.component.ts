import { Component, OnInit } from '@angular/core';

import { Candidate } from '../candidate';
import { BallotService } from '../ballot.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {
  candidates: Candidate[];

  constructor(private ballotService: BallotService) { }

  ngOnInit() {
    this.getCandidates();
    this.checkCanGetBallot();
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


  selectedCandidate: Candidate;

  onSelect(candidate: Candidate): void {
      this.selectedCandidate = candidate;
  }

  canGetBallot: boolean;

  checkCanGetBallot(): void {
      this.ballotService.checkCanGetBallot().then((res) => {
        console.log(res);
        this.canGetBallot = res;
      });
  }

}
