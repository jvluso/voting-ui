import { Component, OnInit } from '@angular/core';
import { Candidate } from '../candidate';
import { BallotService } from '../ballot.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  ballots: Candidate[] = [];

  constructor(private ballotService: BallotService) { }

  ngOnInit() {
    this.getBallots();
  }

  getBallots(): void {
    this.ballotService.getCandidates()
      .subscribe(ballots => this.ballots = ballots.slice(1, 5));
  }
}
