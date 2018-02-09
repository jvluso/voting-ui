import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs';

import { Candidate } from './candidate';
import { MessageService } from './message.service';
import { Web3Service } from './web3.service';
import Web3 = require('web3');
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

  /** GET ballots from the server */
  getCandidates (): Observable<Candidate[]> {
    var candidates = [];
    console.log("here");
    return new Observable(observer => {
      this.web3Service.getBallots().subscribe(candidate => {
        candidates.push(candidate);
        console.log(candidates);
        observer.next(candidates);
      });
    });
  }


  /** GET ballot by id. Return `undefined` when id not found *
  getBallotNo404<Data>(id: number): Observable<Ballot> {
    const url = `${this.ballotsUrl}/?id=${id}`;
    return this.http.get<Ballot[]>(url)
      .pipe(
        map(ballots => ballots[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} ballot id=${id}`);
        }),
        catchError(this.handleError<Ballot>(`getBallot id=${id}`))
      );
  }

  /** GET ballot by id. Will 404 if id not found
  getBallot(id: number): Observable<Ballot> {
    const url = `${this.ballotsUrl}/${id}`;
    return this.http.get<Ballot>(url).pipe(
      tap(_ => this.log(`fetched ballot id=${id}`)),
      catchError(this.handleError<Ballot>(`getBallot id=${id}`))
    );
  }

  /* GET ballots whose name contains search term
  searchBallots(term: string): Observable<Ballot[]> {
    if (!term.trim()) {
      // if not search term, return empty ballot array.
      return of([]);
    }
    return this.http.get<Ballot[]>(`api/ballots/?vote=${term}`).pipe(
      tap(_ => this.log(`found ballots matching "${term}"`)),
      catchError(this.handleError<Ballot[]>('searchBallots', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new ballot to the server
  addBallot (ballot: Ballot): Observable<Ballot> {
    return this.http.post<Ballot>(this.ballotsUrl, ballot, httpOptions).pipe(
      tap((ballot: Ballot) => this.log(`added ballot w/ id=${ballot.id}`)),
      catchError(this.handleError<Ballot>('addBallot'))
    );
  }

  /** DELETE: delete the ballot from the server
  deleteBallot (ballot: Ballot | number): Observable<Ballot> {
    const id = typeof ballot === 'number' ? ballot : ballot.id;
    const url = `${this.ballotsUrl}/${id}`;

    return this.http.delete<Ballot>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted ballot id=${id}`)),
      catchError(this.handleError<Ballot>('deleteBallot'))
    );
  }

  /** PUT: update the ballot on the server
  updateBallot (ballot: Ballot): Observable<any> {
    return this.http.put(this.ballotsUrl, ballot, httpOptions).pipe(
      tap(_ => this.log(`updated ballot id=${ballot.id}`)),
      catchError(this.handleError<any>('updateBallot'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   *
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a BallotService message with the MessageService *
  private log(message: string) {
    this.messageService.add('BallotService: ' + message);
  }*/
}
