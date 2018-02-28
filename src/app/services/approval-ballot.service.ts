import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, ReplaySubject } from 'rxjs/Rx';
import { map, concatMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { range } from 'rxjs/observable/range';
import 'rxjs/Rx';
import { Utils } from '../utils';
var utils = new Utils();

import { Election } from '../classes/election';
import { Candidate } from '../classes/candidate';
import { MessageService } from '../messages/message.service';
import { Web3Service } from '../web3/web3.service';
import { Web3ReferenceService } from './web3-reference.service';
var Web3 = require('web3');
var web3 = new Web3();

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ApprovalBallotService {

  private elections: {};

  constructor(
    private web3Service: Web3Service,
    private messageService: MessageService) { }





    private getElection (address: string): any {
      if(typeof this.elections == 'undefined'){
          this.elections = {};
      }
      if(typeof this.elections[address] == 'undefined'){
          console.log("creating");
          this.elections[address] = {};
          this.elections[address].address = address;
      }
      return this.elections[address];
    }

    getContract(address: string): Observable<any> {

      var election = this.getElection(address);
      if(typeof election.contract == 'undefined'){
        console.log("calling");
        var ABI  =[{"constant":false,"inputs":[{"name":"name","type":"bytes32"}],"name":"addCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"ballots","outputs":[{"name":"voted","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"c","type":"uint256"},{"name":"v","type":"bool"}],"name":"changeVote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidates","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"num","type":"uint256"}],"name":"getCandidate","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"n","type":"bytes32"}],"name":"setName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"activateVote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"electionName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getWinner","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"size","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"weights","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ballotType","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"addressList","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"v","type":"address"}],"name":"addVoter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"s","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]


        let p = this.web3Service.getContract(ABI,election.address);
        election.contract = fromPromise(p).publishReplay(1).refCount();
      }
      return election.contract;
    }



    /** GET ballots from the server */
    checkCanVote (address: string): Observable<boolean> {
      var election = this.getElection(address);
      console.log(election.canVote);
      if(typeof election.canVote == 'undefined'){
        election.canVote = this.getContract(address).concatMap((contract) => {
          return contract.methods['activateVote']().call(
            {
              from: this.web3Service.web3Instance.eth.accounts[0],
              gas:4700000
            },(err,res) =>{
              console.log(err);
              console.log(res);
              if(err){
                return false;
              }else{
                return true;
              }
            });
        }).publishReplay(1).refCount();
      }
      return election.canVote;
    }

    /** GET ballots from the server */
    vote (address: string,length: number,candidate: any): Observable<boolean> {
        return this.getContract(address).concatMap((contract) => {
          return fromPromise(this.web3Service.web3Instance.eth.getAccounts()).map((accounts) => {
            console.log(accounts)
            for(var i=0;i<length;i++){
              contract.methods['changeVote'](i,candidate[i]).send(
                {
                  from: accounts[0],
                  gas:4700000
                });
            }
            return contract.methods['activateVote']().send(
              {
                from: accounts[0],
                gas:4700000
              },(err,res) =>{
                console.log(err);
                console.log(res);
                if(err){
                  return false;
                }else{
                  return true;
                }
            });
          });
        });
    }



}
