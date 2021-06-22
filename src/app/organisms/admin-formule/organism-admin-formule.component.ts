import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { DialogDeleteConfirm } from 'src/app/dialogs/dialog-delete-confirm/dialog-delete-confirm.component';
import { FormuleDialog } from './formule-dialog/formule-dialog.component';

import { Formule } from 'src/app/models/formule.models';
import { FormuleService } from 'src/app/services/formule/formule.service';
import { AgeGroupEnum } from 'src/app/models/age-group.enum';

@Component({
  selector: 'organism-admin-formule',
  templateUrl: './organism-admin-formule.component.html',
  styleUrls: ['./organism-admin-formule.component.scss'],
})
export class OrganismAdminFormule {
  public loading = false;
  public ageGroupEnum = AgeGroupEnum;

  public formules$: Observable<Formule[]>;

  public readonly ADMIN = 'admin';

  private readonly _CONFIRM = 'confirm';
  private readonly _EDIT_MODE = 'edit';
  private readonly _ADMIN_MODE = 'admin';

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
      maxWidth: '600px',
      width: '100%',
    });
    dialogRef.beforeClosed().subscribe((result) => {
      if (result && result.action === this._CONFIRM) {
        this.formuleService
          .addFormule(result.formule)
          .pipe(tap(() => this._getFormules()))
          .subscribe();
      }
    });
  }

  public onOpenModalUpdate(formule: Formule): void {
    console.log(formule);
    const dialogRef = this.dialog.open(FormuleDialog, {
      minWidth: '320px',
      maxWidth: '600px',
      width: '100%',
      data: { formuleId: formule._id, mode: this._EDIT_MODE },
    });
    dialogRef.beforeClosed().subscribe((result) => {
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
      minHeight: '200px',
      data: data.title,
    });
    dialogRef.beforeClosed().subscribe((result) => {
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
    this.loading = true;
    this.formules$ = this.formuleService.getFormules(this._ADMIN_MODE).pipe(
      finalize(() => (this.loading = false)),
      tap((res) => console.log(res))
    );
  }
}
