import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { BallotComponent }      from './ballot/ballot.component';
import { PluralityBallotComponent }      from './plurality-ballot/plurality-ballot.component';
import { ReferenceComponent }      from './reference/reference.component';
import { ElectionDetailsComponent }      from './election-details/election-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/reference', pathMatch: 'full' },
  { path: 'ballots/:id', component: BallotComponent },
  { path: 'plurality-ballots/:id', component: PluralityBallotComponent },
  { path: 'reference', component: ReferenceComponent },
  { path: 'election-details/:id', component: ElectionDetailsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
