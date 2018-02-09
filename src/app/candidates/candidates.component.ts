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
  }

  getCandidates(): void {
    this.ballotService.getCandidates()
      .subscribe({
        next: candidates => {
          this.candidates = candidates;
          console.log("here");
        },
        error: err => console.log(err),
      });
  }
/*
  add(vote: string): void {
    vote = vote.trim();
    if (!vote) { return; }
    this.candidateService.addCandidate({ vote } as Candidate)
      .subscribe(candidate => {
        this.candidates.push(candidate);
      });
  }

  delete(candidate: Candidate): void {
    this.candidates = this.candidates.filter(h => h !== candidate);
    this.candidateService.deleteCandidate(candidate).subscribe();
  }*/

}
