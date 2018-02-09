import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
//import { BallotDetailComponent }  from './ballot-detail/ballot-detail.component';
import { BallotsComponent }      from './ballots/ballots.component';
//import { BallotSearchComponent }  from './ballot-search/ballot-search.component';
import { BallotService }          from './ballot.service';
import { MessageService }       from './message.service';
import { Web3Service }       from './web3.service';
import { Utils }       from './utils';
import { MessagesComponent }    from './messages/messages.component';
import { CandidatesComponent } from './candidates/candidates.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    BallotsComponent,
    //BallotDetailComponent,
    MessagesComponent,
    CandidatesComponent,
    //BallotSearchComponent
  ],
  providers: [ BallotService, MessageService, Web3Service, Utils ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
