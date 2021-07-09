import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'atom-spinner',
  templateUrl: './atom-spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class AtomSpinner {
  @Input() color: string;
}
