import { Injectable, Output, EventEmitter } from '@angular/core';
import { Candidate } from './candidate';
import { Utils } from './utils';
var utils = new Utils();
import { Observable } from 'rxjs/Observable';
import Web3 = require('web3');
var web3 = new Web3();


@Injectable()
export class Web3Service {
    @Output() update = new EventEmitter();
    private contractInstance: any;      // Current unlocked account

    // Application Binary Interface so we can use the question contract


    // Contract get functions must be async to accomodate MetaMask
    getBallots(): Observable<any> {


        return new Observable(observer => {
          this.initializeContract().then(function(contract){
            console.log(contract);
            contract.methods['size']().call(
            function (err,size){
              console.log('size');
              console.log(size);
              for(var i=0;i<size;i++){
                contract.methods['results'](i).call(
                function (err,winner){
                  console.log('size');
                  console.log(utils.hex2a(winner));
                  observer.next({
                    id: i,
                    name: utils.hex2a(winner)
                  });
                });
              }
            });
          })
        });

    }



















    //utilities

    //weiToEth(wei: number): number {
    //    return parseFloat(this.web3.fromWei(wei, 'ether'));
    //}

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
            console.log(web3);
            resolve(web3);
        });
        return p;
    }

    initializeContract(): Promise<any> {
        let p = new Promise<any>((resolve, reject) => {
          this.initializeWeb3().then(function(result){
            console.log(web3.eth);
            var ABI  = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"results","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"ballots","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getWinner","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"size","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"getBallot","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"weights","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"bytes32"}],"name":"addWinner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"added","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"s","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"ballot","type":"address"},{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"index","type":"uint256"}],"name":"BallotCreated","type":"event"}];


            var contract = new web3.eth.Contract(ABI,'0x255b25ff254335467ce1e309a3923d46075b3f49');
            console.log(contract);
            //this.contractInstance = contract.At('0x6B44f7b6bA6db72B52FE89a002B41e44F0b42bC0');
            resolve(contract);
          });
        });
        return p;
    }
}
