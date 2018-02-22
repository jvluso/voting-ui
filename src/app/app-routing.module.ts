import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CandidatesComponent }      from './candidates/candidates.component';
import { ReferenceComponent }      from './reference/reference.component';
import { ElectionDetailsComponent }      from './election-details/election-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/ballots', pathMatch: 'full' },
  { path: 'ballots/:id', component: CandidatesComponent },
  { path: 'ballots', component: ReferenceComponent },
  { path: 'election-details/:id', component: ElectionDetailsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
