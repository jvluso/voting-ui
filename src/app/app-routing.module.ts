import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CandidatesComponent }      from './candidates/candidates.component';
import { ReferenceComponent }      from './reference/reference.component';
import { ElectionDetailsComponent }      from './election-details/election-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/ballots', pathMatch: 'full' },
  { path: 'ballots', component: CandidatesComponent },
  { path: 'reference', component: ReferenceComponent },
  { path: 'election-details', component: ElectionDetailsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
