
import { Candidate } from '../classes/candidate';
import { Observable } from 'rxjs/Rx';

export class Election {
  address: string;
  name: Observable<string>;
  candidateObs: Observable<Candidate[]>;
  candidates: Candidate[];
  contract: any;
}
