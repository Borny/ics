import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Formule } from 'src/app/models/formule.models';

@Component({
  selector: 'molecule-card-formule',
  templateUrl: './card-formule.component.html',
  styleUrls: ['./card-formule.component.scss'],
  animations: [
    // buttonAnimation
  ],
})
export class MoleculeCardFormule implements OnInit {
  @Input() formule: Formule;
  @Input() mode: string;

  @Output() delete: EventEmitter<Formule> = new EventEmitter<Formule>();
  @Output() update: EventEmitter<Formule> = new EventEmitter<Formule>();

  public readonly HAS_COUPON = 'Possède un coupon';
  public readonly NO_COUPON = 'Ne possède pas de coupon';
  public readonly USER = 'user';
  public readonly ADMIN = 'admin';

  constructor() {}

  ngOnInit() {}

  public onDeleteFormule(formule: Formule): void {
    this.delete.emit(formule);
  }

  public onUpdateFormule(formule: Formule): void {
    this.update.emit(formule);
  }

  public onDisplayDetails(formule: Formule): void {
    // this.editFormule.emit(formule);
  }
}
