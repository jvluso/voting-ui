import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs';
import { Utils } from './utils';
var utils = new Utils();

import { Candidate } from './candidate';
import { MessageService } from './message.service';
import { Web3Service } from './web3.service';
var Web3 = require('web3');
var web3 = new Web3();

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BallotService {

  private ballotsUrl = 'api/ballots';  // URL to web api

  constructor(
    private web3Service: Web3Service,
    private messageService: MessageService) { }




    // Contract get functions must be async
    getBallot(): Promise<any> {
        return this.web3Service.getRecentContract();
    }

    // Contract get functions must be async
    getCandidate(): Observable<any> {
        return new Observable(observer => {
          this.getBallot().then((contract) => {
            contract.methods['size']().call((err,size) => {
              for(var i=0;i<size;i++){
                contract.methods['getCandidate'](i).call((err,candidate) => {
                  observer.next({
                    id: candidate[1],
                    name: utils.hex2a(candidate[0])
                  });
                });
              }
            });
          })
        });
    }

    /** GET ballots from the server */
    getCandidates (): Observable<Candidate[]> {
      var candidates = [];
      return new Observable(observer => {
        this.getCandidate().subscribe(candidate => {
          candidates.push(candidate);
          observer.next(candidates);
        });
      });
    }


    /** GET ballots from the server */
    checkCanGetBallot (): Promise<boolean> {
      let p = new Promise<any>((resolve, reject) => {
        return this.getBallot().then((contract) => {
          var acc = this.web3Service.web3Instance.eth.accounts[0];
          contract.methods['getBallot']().call(
            {
              from: acc,
              gas:4700000
            },
            (err,res) =>{
            console.log(err);
            console.log(res);
            if(err){
              resolve(false);
            }else{
              resolve(true);
            }
          });
        });
      });
      return p;
    }

    /** GET ballots from the server */
    requestBallot (): Promise<boolean> {
      let p = new Promise<any>((resolve, reject) => {
        return this.getBallot().then((contract) => {
          console.log(contract)
          contract.methods['getBallot']().call(
            {
              from:'0x2Da0565Ef4A474a6c6496b62D3CB974f5A6ea526',
              gas:300000
            },
            (err,res) =>{
            console.log(err);
            console.log(res);
            if(err){
              resolve(false);
            }else{
              resolve(true);
            }
          });
        });
      });
      return p;
    }
}
