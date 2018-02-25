import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralityBallotComponent } from './plurality-ballot.component';

describe('PluralityBallotComponent', () => {
  let component: PluralityBallotComponent;
  let fixture: ComponentFixture<PluralityBallotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PluralityBallotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralityBallotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
