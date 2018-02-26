import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { interval } from 'rxjs/observable/interval';
import { Web3ReferenceService } from '../services/web3-reference.service';
import { Web3Service } from '../web3/web3.service';
import { ActivatedRoute } from '@angular/router';
import { BallotService } from '../services/ballot.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.css']
})
export class ReferenceComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private web3Service: Web3Service,
    private cdRef:ChangeDetectorRef,
    private web3ReferenceService: Web3ReferenceService,
    private ballotService: BallotService) { }

  ngOnInit() {
    this.refreshFields();
  }

  refreshFields(): void {
    this.getElections();
  }


  elections: string[];

  getElections(): void {
    this.elections = [];
    this.web3ReferenceService.getElections().subscribe(res => {
      this.elections = res;
      this.cdRef.detectChanges();
    });
  }


}
