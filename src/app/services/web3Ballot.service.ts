import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs';
import { Utils } from '../utils';
var utils = new Utils();

import { Election } from '../classes/election';
import { Candidate } from '../classes/candidate';
import { MessageService } from '../messages/message.service';
import { Web3Service } from '../web3/web3.service';
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





    getElection (address: string): Election {
      console.log(address);
      return {
        address: address,
        name: '',
        candidates: [],
        contract: ''
      }
    }


    getName (election: Election): Promise<string> {
      let p = new Promise<string>((resolve, reject) => {
        this.getContract(election).then((contract) => {
          contract.methods['electionName']().call((err,res) =>{
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



    getCandidates(election: Election): Observable<any> {
      console.log(election);
        return new Observable(observer => {
          this.getContract(election).then((contract) => {
            console.log(contract);
            contract.methods['size']().call((err,size) => {
              console.log(size);
              for(var i=0;i<size;i++){
                contract.methods['getCandidate'](i).call((err,candidate) => {
                  console.log(candidate);
                  election.candidates.push({
                    id: candidate[1],
                    name: utils.hex2a(candidate[0])
                  });
                  console.log(election.candidates);
                  observer.next(election.candidates);
                });
              }
            });
          })
        });
    }



    getContract(election: Election): Promise<any> {

        let p = new Promise<any>((resolve, reject) => {
            var ABI  = [{"constant":false,"inputs":[{"name":"v","type":"uint256"}],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"bytes32"}],"name":"addCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"ballots","outputs":[{"name":"voted","type":"bool"},{"name":"vote","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidates","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"num","type":"uint256"}],"name":"getCandidate","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"n","type":"bytes32"}],"name":"setName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"electionName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getWinner","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"size","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"weights","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"addressList","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"v","type":"address"}],"name":"addVoter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"s","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]

            this.web3Service.getContract(ABI,election.address).then((ctrct) =>{
              console.log(ctrct);
              resolve(ctrct);
            });
        });
        return p;
    }





    getWinningCandidate (election: Election): Promise<string> {
      let p = new Promise<string>((resolve, reject) => {
        this.getContract(election).then((contract) => {
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
    checkCanVote (election: Election): Promise<boolean> {
      console.log(election);
      let p = new Promise<any>((resolve, reject) => {
        this.getContract(election).then((contract) => {
          console.log(contract);
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
    vote (election: Election,choice: Candidate): Promise<boolean> {
      let p = new Promise<any>((resolve, reject) => {
        this.getContract(election).then((contract) => {
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



    getRecentElection (): Promise<Election> {
      let p = new Promise<Election>((resolve, reject) => {
        this.web3Service.getContractLocation().then((address) => {

            resolve( {
              address: address,
              name: '',
              candidates: [],
              contract: ''
            });
        });
      });
      return p;
    }

    getNullElection (): Election {
      return {
        address: '',
        name: '',
        candidates: [],
        contract: ''
      }
    }


}
