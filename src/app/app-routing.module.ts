import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { BallotsComponent }      from './ballots/ballots.component';
import { CandidatesComponent }      from './candidates/candidates.component';
//import { BallotDetailComponent }  from './ballot-detail/ballot-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/ballots', pathMatch: 'full' },
  //{ path: 'detail/:id', component: BallotDetailComponent },
  { path: 'ballots', component: CandidatesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
