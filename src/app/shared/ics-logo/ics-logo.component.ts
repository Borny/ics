import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ics-logo',
  templateUrl: './ics-logo.component.html',
  styleUrls: ['./ics-logo.component.scss']
})

export class IcsLogoComponent implements OnInit {
  @Input() color: string;
  @Input() showSubTitle: boolean;

  constructor() { }

  ngOnInit() { }
}
