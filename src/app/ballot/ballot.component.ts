import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { interval } from 'rxjs/observable/interval';
import { Candidate } from '../classes/candidate';
import { Election } from '../classes/election';
import { ChangeDetectorRef } from '@angular/core';
import { BallotService } from '../services/ballot.service';
import { PluralityBallotComponent } from '../plurality-ballot/plurality-ballot.component';
import { Web3Service } from '../web3/web3.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ballot',
  templateUrl: './ballot.component.html'
})
export class BallotComponent implements OnInit {
  address: string;

  constructor(
    private route: ActivatedRoute,
    private web3Service: Web3Service,
    private ballotService: BallotService,
    private cdRef:ChangeDetectorRef) { }

  ngOnInit() {
    this.address = this.route.snapshot.paramMap.get('id');
    this.refreshFields();
  }

  refreshFields(): void {
    this.getBallotType();
  }

  ballotType: boolean;

  getBallotType(): void {
    this.ballotService.ballotType(this.address).subscribe((res) => {
      console.log(res);
      this.ballotType = (res == "Plurality");
      this.cdRef.detectChanges();
    });
  }

}
