import { Component, Input } from '@angular/core';
import { AgeGroupEnum } from 'src/app/models/age-group.enum';
import { Formule } from 'src/app/models/formule.models';

@Component({
  selector: 'organism-sessions',
  templateUrl: 'sessions.component.html',
  styleUrls: ['sessions.component.scss'],
})
export class SessionsComponent {
  @Input() formule: Formule;
  @Input() style: string;

  public ageGroup = AgeGroupEnum;

  ngOnInit(): void {
    console.log(this.formule);
  }
}
