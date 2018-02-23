import { Injectable } from '@angular/core';
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

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BallotService {

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
          this.elections[address].candidates = [];
      }
      return this.elections[address];
    }


    getName (address: string): Observable<string> {
      var election = this.getElection(address);
      if(typeof election.name == 'undefined'){
        election.name = this.getContract(address).concatMap((contract) => {
          console.log(contract);
          return contract.methods['electionName']().call()
        }).map((res) => {
          return utils.hex2a(res);
        }).publishReplay(1).refCount();
      }
      return election.name;
    }



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



    getContract(address: string): Observable<any> {

      var election = this.getElection(address);
      if(typeof election.contract == 'undefined'){
        let p = new Promise<any>((resolve, reject) => {
            var ABI  = [{"constant":false,"inputs":[{"name":"v","type":"uint256"}],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"bytes32"}],"name":"addCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"ballots","outputs":[{"name":"voted","type":"bool"},{"name":"vote","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidates","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"num","type":"uint256"}],"name":"getCandidate","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"n","type":"bytes32"}],"name":"setName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"electionName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getWinner","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"size","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"weights","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"addressList","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"v","type":"address"}],"name":"addVoter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"s","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]

            console.log(election.address);
            this.web3Service.getContract(ABI,election.address).then((ctrct) =>{
              console.log(ctrct);
              this.getElection(address).contract=ctrct;
              resolve(ctrct);
            });
        });
        election.contract = fromPromise(p).publishLast().refCount();
      }
      return election.contract;
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



    /** GET ballots from the server */
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

    /** GET ballots from the server */
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
