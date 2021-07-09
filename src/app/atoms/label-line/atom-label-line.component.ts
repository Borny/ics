import { Component, Input } from '@angular/core';

@Component({
  selector: 'atom-label-line',
  templateUrl: './atom-label-line.component.html',
  styleUrls: ['./atom-label-line.component.scss'],
})

export class AtomLabelLine {
  @Input() label: string;
}
