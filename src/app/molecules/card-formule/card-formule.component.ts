import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormuleDetails } from 'src/app/dialogs/dialog-formule-details/dialog-formule-details.component';

import { Formule } from 'src/app/models/formule.models';

@Component({
  selector: 'molecule-card-formule',
  templateUrl: './card-formule.component.html',
  styleUrls: ['./card-formule.component.scss'],
  animations: [
    // buttonAnimation
  ],
})
export class MoleculeCardFormule {
  @Input() formule: Formule;
  @Input() mode: string;
  @Input() formuleIndex: number;

  @Output() delete: EventEmitter<Formule> = new EventEmitter<Formule>();
  @Output() update: EventEmitter<Formule> = new EventEmitter<Formule>();
  @Output() checked: EventEmitter<{ checked: boolean; formule: Formule }> =
    new EventEmitter<{ checked: boolean; formule; formuleIndex: number }>();

  public isChecked = false;

  public readonly HAS_COUPON = 'Possède un coupon';
  public readonly NO_COUPON = 'Ne possède pas de coupon';
  public readonly USER = 'user';
  public readonly ADMIN = 'admin';

  constructor(public dialog: MatDialog) {}

  public onDeleteFormule(formule: Formule): void {
    this.delete.emit(formule);
  }

  public onUpdateFormule(formule: Formule): void {
    this.update.emit(formule);
  }

  public onDisplayDetails(formule: Formule): void {
    const dialogRef = this.dialog.open(DialogFormuleDetails, {
      minWidth: '320px',
      data: formule,
    });
    dialogRef.beforeClosed().subscribe();
  }

  public onToggleCheck(): void {
    this.isChecked = !this.isChecked;
    this.checked.emit({ checked: this.isChecked, formule: this.formule });
  }
}
