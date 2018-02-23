import { Injectable } from '@angular/core';
import { Web3Service } from '../web3/web3.service';
import { Observable } from 'rxjs/Rx';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Injectable()
export class Web3ReferenceService {

    private contractInstance: any;
    private address: string;

  constructor(
    private web3Service: Web3Service) { }





    getContract(): Observable<any> {

      if(typeof this.contractInstance == 'undefined'){
        var ABI  =[{"constant":false,"inputs":[{"name":"election","type":"address"}],"name":"setRecentElection","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"elections","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]

        let p = this.web3Service.getContract(ABI,'0x2bdafdc3e9d8c996cac65bf1baf8999fc19e1e17');
        this.contractInstance = fromPromise(p).publishLast().refCount();
      }
      return this.contractInstance;
    }

}
