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
    getWinningCandidate (): Promise<string> {
      let p = new Promise<string>((resolve, reject) => {
        this.getBallot().then((contract) => {
          console.log(contract);
          contract.methods['getWinner']().call((err,res) =>{
            console.log('gotWinner');
            if(err){
              resolve('');
            }else{
              resolve(utils.hex2a(res));
            }
          });
        });
      });
      return p;
    }


    /** GET ballots from the server */
    checkCanVote (): Promise<boolean> {
      let p = new Promise<any>((resolve, reject) => {
        this.getBallot().then((contract) => {
          this.web3Service.web3Instance.eth.getAccounts((err,acc) => {
            contract.methods['vote'](0).call(
              {
                from: acc[0],
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
      });
      return p;
    }

    /** GET ballots from the server */
    vote (choice: Candidate): Promise<boolean> {
      let p = new Promise<any>((resolve, reject) => {
        this.getBallot().then((contract) => {
          this.web3Service.web3Instance.eth.getAccounts((err,acc) => {
            contract.methods['vote'](choice.id).send(
              {
                from: acc[0],
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
      });
      return p;
    }
}
