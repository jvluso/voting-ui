import { Injectable } from '@angular/core';
import { Web3Service } from '../web3/web3.service';
import { Observable } from 'rxjs/Rx';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { range } from 'rxjs/observable/range';

@Injectable()
export class Web3ReferenceService {

    private contractObs: any;
    private contractInstance: any;
    private address: string;
    private elections: any;
    private electionsObs: any;

  constructor(
    private web3Service: Web3Service) { }





    getElections(): Observable<any> {
      if(typeof this.elections == 'undefined'){
        this.elections = [];
      }
      if(typeof this.electionsObs == 'undefined'){
        this.electionsObs =  this.getContract().concatMap((contract) => {
          console.log(contract);
          return fromPromise(contract.methods['size']().call())
            .concatMap((size) => {
              console.log(size);
              return range(0,+size);
            }).concatMap((i) => {
              console.log(i)
              return contract.methods['elections'](i).call();
            }).map((id) => {
              console.log(id);
              this.elections.push(id);
              console.log(this.elections);
              return this.elections;
            });
        }).publishReplay(1).refCount();
      }
      return this.electionsObs;
    }


    getContract(): Observable<any> {

      if(typeof this.contractObs == 'undefined'){
        let p = new Promise<any>((resolve, reject) => {
          var ABI  = [{"constant":false,"inputs":[{"name":"election","type":"address"}],"name":"setRecentElection","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"elections","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"size","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]

          console.log("getContract")
          this.web3Service.getContract(ABI,'0x1b26a4ed054c8ca4252008f7b9cdfc077a06216e').then((ctrct) =>{
            console.log(ctrct);
            this.contractInstance = ctrct;
            resolve(ctrct);
          });
        });
        this.contractObs = fromPromise(p).publishReplay(1).refCount();
      }
      return this.contractObs;
    }


}
