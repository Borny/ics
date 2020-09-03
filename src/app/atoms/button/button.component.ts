import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'atom-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class ButtonComponent implements OnInit {
  @Input() text: string;
  @Input() isDisabled = false;
  @Input() type: string;

  @Output() clickEvent: EventEmitter<Event> = new EventEmitter<Event>();

  constructor() { }

  ngOnInit() { }

  public onClick(event: Event): void {
    this.clickEvent.emit(event);
  }
}
