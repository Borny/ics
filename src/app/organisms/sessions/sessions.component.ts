import { Component, OnInit, Input } from '@angular/core';
import { SessionsKids } from '../../models/sessionsKids.model';
import { SessionsAdults } from '../../models/sessionsAdults.model';

@Component({
  selector: 'organism-sessions',
  templateUrl: 'sessions.component.html',
  styleUrls: ['sessions.component.scss']
})

export class SessionsComponent implements OnInit {
  @Input() sessionsKids: SessionsKids;
  @Input() sessionsAdults: SessionsAdults;
  @Input() style: string;

  constructor() {
    console.log(this.sessionsAdults);
  }

  ngOnInit() {
    // console.log(this.sessionsKids)
    console.log(this.sessionsAdults);
  }
}
