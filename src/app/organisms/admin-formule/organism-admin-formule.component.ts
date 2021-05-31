import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { DialogDeleteConfirm } from 'src/app/dialogs/dialog-delete-confirm/dialog-delete-confirm.component';
import { FormuleDialog } from './formule-dialog/formule-dialog.component';

import { Formule } from 'src/app/models/formule.models';
import { FormuleService } from 'src/app/services/formule/formule.service';

@Component({
  selector: 'organism-admin-formule',
  templateUrl: './organism-admin-formule.component.html',
  styleUrls: ['./organism-admin-formule.component.scss'],
})
export class OrganismAdminFormule {
  public loading = false;
  public formules$: Observable<Formule[]>;

  // public readonly HAS_COUPON = 'Possède un coupon';
  // public readonly NO_COUPON = 'Ne possède pas de coupon';

  private readonly _CONFIRM = 'confirm';
  private readonly _CANCEL = 'cancel';
  public readonly ADMIN = 'admin';

  constructor(
    public dialog: MatDialog,
    private formuleService: FormuleService
  ) {}

  ngOnInit(): void {
    this._getFormules();
  }

  public onOpenModalCreate(): void {
    const dialogRef = this.dialog.open(FormuleDialog, {
      minWidth: '320px',
      // data: userId
    });
    dialogRef.beforeClosed().subscribe((result) => {
      // console.log('result.action', result.action);
      // console.log('result.formule', result.formule);
      // this.formules.push(result.formule);

      if (result.action === this._CONFIRM) {
        this.formuleService
          .addFormule(result.formule)
          .pipe(tap(() => this._getFormules()))
          .subscribe();
      }
    });
  }

  public onOpenModalDelete(data: any): void {
    const dialogRef = this.dialog.open(DialogDeleteConfirm, {
      // minWidth: '320px',
      minHeight: '200px',
      data: data.title
    });
    dialogRef.beforeClosed().subscribe((result) => {
      // console.log('result.action', result.action);
      // console.log('result.formule', result.formule);
      // this.formules.push(result.formule);

      if (result.action === this._CONFIRM) {
        this.formuleService
          .deleteFormule(data)
          .pipe(tap(() => this._getFormules()))
          .subscribe();
      }
    });
  }

  public onEditFormule(formule: Formule): void {
    console.log('edit formule', formule.title);
  }

  private _getFormules(): void {
    console.log('get formules');
    this.loading = true;
    this.formules$ = this.formuleService
      .getFormules()
      .pipe(finalize(() => (this.loading = false)));
  }
}
