import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class Utils {
    hex2a(hex: any): string {
        var str = '';
        for (var i = 2; i < hex.length; i += 2)
            if(hex.substr(i, 2) != "00")
              str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        return str;
    }
}
