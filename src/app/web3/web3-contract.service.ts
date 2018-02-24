/*import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
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

@Injectable()
export class Web3ContractService {

  private contracts: {};

  constructor(
    private web3Service: Web3Service,
    private messageService: MessageService) { }





    private getObservable (address: string,abiType: string): any {
      if(typeof this.elections == 'undefined'){
          this.elections = {};
      }
      if(typeof this.elections[address] == 'undefined'){
          console.log("creating");
          this.elections[address] = {};
      }
      if(typeof this.elections[address][abiType] == 'undefined'){
          console.log("creating");
          this.elections[address][abiType] = {};
      }
      return this.elections[address][abiType];
    }


    viewString (address: string, abiType: string,name: string): Observable<string> {
      var obs = this.getObservable(address,abiType);
      if(typeof obs[name] == 'undefined'){
        obs[name] = this.getContract(address,abiType).concatMap((contract) => {
          return contract.methods[name]().call()
        }).map((res) => {
          return utils.hex2a(res);
        }).publishReplay(1).refCount();
      }
      return obs[name];
    }


/*
    getCandidates(address: string): Observable<any> {
      var election = this.getElection(address);
      if(typeof election.candidateObs == 'undefined'){
        election.candidateObs =  this.getContract(address).concatMap((contract) => {
          console.log(contract);
          return contract.methods['size']().call();
        }).concatMap((size) => {
          console.log(size);
          return range(0,+size);
        }).concatMap((i) => {
          console.log(election.contract);
          console.log(i)
          return election.contract.methods['getCandidate'](i).call();
        }).map((candidate) => {
          console.log(candidate);
          election.candidates.push({
            id: candidate[1],
            name: utils.hex2a(candidate[0])
          });
          console.log(election.candidates);
          return election.candidates;
        }).publishLast().refCount();
      }
      return election.candidateObs;
    }

*

    getContract(address: string,abiType: string,ABI: any): Observable<any> {

      var obs = this.getObservable(address,abiType);
      if(typeof obs.contract == 'undefined'){
        let p = new Promise<any>((resolve, reject) => {
            console.log(election.address);
            this.web3Service.getContract(ABI,address).then((ctrct) =>{
              console.log(ctrct);
              this.getElection(address).contract=ctrct;
              resolve(ctrct);
            });
        });
        obs.contract = fromPromise(p).publishLast().refCount();
      }
      return obs.contract;
    }







    getWinningCandidate (address: string): Observable<string> {
      var election = this.getElection(address);
      if(typeof election.winningCandidate == 'undefined'){
        election.winningCandidate = this.getContract(address).concatMap((contract) => {
          return contract.methods['getWinner']().call()
        }).map((res) => {
          return utils.hex2a(res);
        }).publishLast().refCount();
      }
      return election.winningCandidate;
    }



    /** GET ballots from the server *
    checkCanVote (address: string): Observable<boolean> {
      var election = this.getElection(address);
      if(typeof election.canVote == 'undefined'){
        election.canVote = this.getContract(address).concatMap((contract) => {
          return contract.methods['vote'](0).call(
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
        }).publishLast().refCount();
      }
      return election.canVote;
    }

    /** GET ballots from the server *
    vote (address: string,candidate: Candidate): Observable<boolean> {
        return this.getContract(address).concatMap((contract) => {
          return contract.methods['vote'](candidate.id).send(
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
        });
    }



}
*/
