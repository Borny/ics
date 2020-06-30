import { Component, OnInit, Input } from '@angular/core';
import { ClassesKids } from '../../models/sessionsKids.model';
import { ClassesAdults } from '../../models/sessionsAdults.model';

@Component({
  selector: 'organism-classes',
  templateUrl: 'classes.component.html',
  styleUrls: ['classes.component.scss']
})

export class ClassesComponent implements OnInit {
  @Input() classes: ClassesAdults | ClassesKids;

  constructor() { }

  ngOnInit() {
    console.log(this.classes)
  }
}
