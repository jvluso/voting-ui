import { Injectable } from '@angular/core';
import { Web3Service } from '../web3/web3.service';

@Injectable()
export class Web3ReferenceService {

    private contractInstance: any;
    private contractLocation: string;
    private contractABI: any;

  constructor(
    private web3Service: Web3Service) { }




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
            return this.web3Service.initializeContract(ABI,contractLocation);
        }
    }




    initializeContractLocation(): Promise<string> {
        let p = new Promise<string>((resolve, reject) => {
          this.web3Service.getWeb3().then((result) => {

              var ABI = [{"constant":false,"inputs":[{"name":"election","type":"address"}],"name":"setRecentElection","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"elections","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]


              this.getContract(ABI,'0x2bdafdc3e9d8c996cac65bf1baf8999fc19e1e17').then((refContract) => {
                console.log(refContract);
                refContract.methods['elections'](1).call((err,recentElection) => {
                  console.log(recentElection);
                  resolve(recentElection);
                });
              });
          });
        });
        return p;
    }
}
