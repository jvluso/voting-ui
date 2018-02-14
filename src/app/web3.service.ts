import { Injectable, Output, EventEmitter } from '@angular/core';
import { Candidate } from './candidate';
import { Utils } from './utils';
var utils = new Utils();

import { Observable } from 'rxjs/Observable';
var Web3 = require('web3');
var web3 = new Web3();


@Injectable()
export class Web3Service {
    private contractInstance: any;
    private contractLocation: string;
    private contractABI: any;
    private web3Instance: any;

    // Application Binary Interface so we can use the question contract


    // Contract get functions must be async
    getRecentContract(): Promise<any> {

        let p = new Promise<any>((resolve, reject) => {
            this.getContractLocation().then((cntrLoc) =>{
              var ABI  = [{"constant":false,"inputs":[{"name":"name","type":"bytes32"}],"name":"addCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidates","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"num","type":"uint256"}],"name":"getCandidate","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"ballots","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getWinner","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"size","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"getBallot","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"weights","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"added","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"s","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"ballot","type":"address"},{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"index","type":"uint256"}],"name":"BallotCreated","type":"event"}]
              this.getContract(ABI,cntrLoc).then((ctrct) =>{
                resolve(ctrct);
              });
            });
        });
        return p;
    }












    getContractLocation(): Promise<string>{
      if(typeof this.contractLocation !== 'undefined'){
          console.log(this.contractLocation);
          return Promise.resolve(this.contractLocation);
      }else{
          console.log("creating");
          return this.initializeContractLocation();
      }

    }

    getContract(ABI: any, contractLocation:string): Promise<any> {
        if (typeof this.contractInstance !== 'undefined') {
            return Promise.resolve(this.contractInstance);
        }else{
            return this.initializeContract(ABI,contractLocation);
        }
    }


    getWeb3(): Promise<any> {
        if (typeof this.web3Instance !== 'undefined') {
            return Promise.resolve(this.web3Instance);
        }else{
            return this.initializeWeb3();
        }
    }

    initializeWeb3(): Promise<any> {
        let p = new Promise<any>((resolve, reject) => {
            // Is there is an injected web3 instance?
            if (typeof window['web3'] !== 'undefined') {
                console.log("using external web3");
                web3 = new Web3(window['web3'].currentProvider);
            } else {
                // If no injected web3 instance is detected, fallback to Ganache CLI.
                console.log("using ganache web3")
                web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
            }
            this.web3Instance=web3;
            resolve(web3);
        });
        return p;
    }

    initializeContract(ABI: any,contractLocation: string): Promise<any> {
        let p = new Promise<any>((resolve, reject) => {
          this.getWeb3().then((result) => {

            var contract = new web3.eth.Contract(ABI,contractLocation);
            resolve(contract);
          });
        });
        return p;
    }


    initializeContractLocation(): Promise<string> {
        let p = new Promise<string>((resolve, reject) => {
          this.getWeb3().then((result) => {

              var ABI = [{"constant":false,"inputs":[{"name":"election","type":"address"}],"name":"setRecentElection","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"recentElection","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}];
              this.getContract(ABI,'0x333618cd53ef8e6a56413413d56486d2f2320499').then((refContract) => {

                refContract.methods['recentElection']().call((err,recentElection) => {
                  resolve(recentElection);
                });
              });
          });
        });
        return p;
    }
}
