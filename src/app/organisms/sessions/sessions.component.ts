import { Component, Input } from '@angular/core';
import { SessionsKids } from '../../models/sessionsKids.model';
import { SessionsAdults } from '../../models/sessionsAdults.model';

@Component({
  selector: 'organism-sessions',
  templateUrl: 'sessions.component.html',
  styleUrls: ['sessions.component.scss']
})

export class SessionsComponent {
  @Input() sessionsKids: SessionsKids;
  @Input() sessionsAdults: SessionsAdults;
  @Input() style: string;
}
