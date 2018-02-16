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
    this.checkCanVote();
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

  canVote: boolean;

  checkCanVote(): void {
      this.ballotService.checkCanVote().then((res) => {
        console.log(res);
        this.canVote = res;
      });
  }

  vote(): void {
      this.ballotService.vote(this.selectedCandidate).then((res) => {
        console.log(res);
        this.canVote = res;
      });
  }

}
