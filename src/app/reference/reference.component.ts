import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { interval } from 'rxjs/observable/interval';
import { Web3ReferenceService } from '../services/web3-reference.service';
import { Web3Service } from '../web3/web3.service';
import { ActivatedRoute } from '@angular/router';
import { BallotService } from '../services/ballot.service';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.css']
})
export class ReferenceComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private web3Service: Web3Service,
    private web3ReferenceService: Web3ReferenceService,
    private ballotService: BallotService) { }

  ngOnInit() {
    this.refreshFields();
  }

  refreshFields(): void {
    this.getElections();
  }


  elections: Observable<string[]>;

  getElections(): void {
    this.elections = this.web3ReferenceService.getElections();
  }


}
