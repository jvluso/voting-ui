import { Injectable, Output, EventEmitter } from '@angular/core';
import { Candidate } from '../classes/candidate';
import { Utils } from '../utils';
var utils = new Utils();

import { Observable } from 'rxjs/Observable';
var Web3 = require('web3');
var web3 = new Web3();


@Injectable()
export class Web3Service {
    public web3Instance: any;

    // Application Binary Interface so we can use the question contract




    getContract(ABI: any,contractLocation: string): Promise<any> {
        return this.getWeb3().then((result) => {

            var contract = new web3.eth.Contract(ABI,contractLocation);
            console.log(contract);
            return contract;
        });
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

}
