import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { BallotService }          from './services/ballot.service';
import { PluralityBallotService }          from './services/plurality-ballot.service';
import { Web3ReferenceService } from './services/web3-reference.service';
import { MessageService }       from './messages/message.service';
import { Web3Service }       from './web3/web3.service';
import { Utils }       from './utils';
import { MessagesComponent }    from './messages/messages.component';
import { PluralityBallotComponent } from './plurality-ballot/plurality-ballot.component';
import { ElectionDetailsComponent } from './election-details/election-details.component';
import { ReferenceComponent } from './reference/reference.component';
import { BallotComponent } from './ballot/ballot.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    MessagesComponent,
    PluralityBallotComponent,
    ElectionDetailsComponent,
    ReferenceComponent,
    BallotComponent
  ],
  providers: [
    BallotService,
    PluralityBallotService,
    MessageService,
    Web3Service,
    Utils,
    Web3ReferenceService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
