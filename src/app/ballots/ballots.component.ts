import { Component, OnInit } from '@angular/core';

import { Ballot } from '../ballot';
import { BallotService } from '../ballot.service';

@Component({
  selector: 'app-ballots',
  templateUrl: './ballots.component.html',
  styleUrls: ['./ballots.component.css']
})
export class BallotsComponent implements OnInit {
  ballots: Ballot[];

  constructor(private ballotService: BallotService) { }

  ngOnInit() {
    //this.getBallots();
  }
/*
  getBallots(): void {
    this.ballotService.getBallots()
      .subscribe(ballots => this.ballots = ballots);
  }
/*
  add(vote: string): void {
    vote = vote.trim();
    if (!vote) { return; }
    this.ballotService.addBallot({ vote } as Ballot)
      .subscribe(ballot => {
        this.ballots.push(ballot);
      });
  }

  delete(ballot: Ballot): void {
    this.ballots = this.ballots.filter(h => h !== ballot);
    this.ballotService.deleteBallot(ballot).subscribe();
  }*/

}
