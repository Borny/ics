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

  public readonly ADMIN = 'admin';

  private readonly _CONFIRM = 'confirm';
  private readonly _CANCEL = 'cancel';
  private readonly _CREATE_MODE = 'create';
  private readonly _EDIT_MODE = 'edit';

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
    });
    dialogRef.beforeClosed().subscribe((result) => {
      // console.log('result.action', result);
      // console.log('result.action', result.action);

      if (result && result.action === this._CONFIRM) {
        this.formuleService
          .addFormule(result.formule)
          .pipe(tap(() => this._getFormules()))
          .subscribe();
      }
    });
  }

  public onOpenModalUpdate(formule: Formule): void {
    const dialogRef = this.dialog.open(FormuleDialog, {
      minWidth: '320px',
      data: { formuleId: formule._id, mode: this._EDIT_MODE },
    });
    dialogRef.beforeClosed().subscribe((result) => {
      // console.log('result.action', result.action);
      // console.log('result.formule', result.formule);

      if (result.action === this._CONFIRM) {
        this.formuleService
          .updateFormule(result.formule)
          .pipe(tap(() => this._getFormules()))
          .subscribe();
      }
    });
  }

  public onOpenModalDelete(data: any): void {
    const dialogRef = this.dialog.open(DialogDeleteConfirm, {
      // minWidth: '320px',
      minHeight: '200px',
      data: data.title,
    });
    dialogRef.beforeClosed().subscribe((result) => {
      console.log('result.action', result.action);

      if (result && result.action === this._CONFIRM) {
        this.loading = true;
        this.formuleService
          .deleteFormule(data)
          .pipe(tap(() => this._getFormules()))
          .subscribe();
      }
    });
  }

  private _getFormules(): void {
    console.log('get formules');
    this.loading = true;
    this.formules$ = this.formuleService
      .getFormules()
      .pipe(finalize(() => (this.loading = false)));
  }
}
