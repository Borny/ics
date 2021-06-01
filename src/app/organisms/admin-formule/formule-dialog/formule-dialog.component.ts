import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { MaterialModule } from 'src/app/angular-material/angular-material.module';
import { AgeGroupEnum } from 'src/app/models/age-group.enum';
import { FormuleService } from 'src/app/services/formule/formule.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { Formule } from '../../../models/formule.models';

@Component({
  selector: 'formule-dialog',
  templateUrl: './formule-dialog.component.html',
  styleUrls: ['./formule-dialog.component.scss'],
})
export class FormuleDialog {
  public formule: Formule;
  public formuleId: string;
  public mode: string;
  public formuleForm: FormGroup = new FormGroup({});
  public loading = false;
  public dialogTitle = 'Créer une Formule';
  public ageGroup = Object.values(AgeGroupEnum);

  public readonly CONFIRM = 'confirm';
  public readonly CANCEL = 'cancel';
  public readonly EDIT_MODE = 'edit';

  private readonly _CREATE_MODE = 'create';
  private readonly _UPDATE_FORMULE = 'Modifier la formule';

  constructor(
    private formuleService: FormuleService,
    public dialogRef: MatDialogRef<FormuleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { formuleId: string; mode: string }
  ) {
    this.loading = true;
    if (data?.mode === this.EDIT_MODE) {
      this.formuleId = data.formuleId;
      this.mode = data.mode;
      this.dialogTitle = this._UPDATE_FORMULE;
      this._getFormule(this.formuleId);
    } else {
      this._initForm();
    }

    console.log(this.ageGroup);

    // this.dialogRef.disableClose = true;
  }

  // ngOnInit(): void {
  //   this._initForm();
  // }

  public onCancel(): void {
    console.log('on cancel delete');
    this.dialogRef.close({ action: this.CANCEL });
  }

  public onSubmit(): void {
    if (this.formuleForm.invalid) {
      return;
    }
    this.formule = this.formuleForm.value;
    this.formule._id = this.formuleId;
    this.dialogRef.close({ action: this.CONFIRM, formule: this.formule });
    // console.log(this.formuleForm.value);
  }

  private _initForm(formData?: Formule): void {
    let initialData;
    if (this.mode === this.EDIT_MODE) {
      initialData = formData;
    }

    console.log('initialData', initialData);

    this.formuleForm.addControl(
      'title',
      new FormControl(initialData?.title || null, Validators.required)
    );
    this.formuleForm.addControl(
      'price',
      new FormControl(initialData?.price || null, [
        Validators.required,
        Validators.min(0),
      ])
    );
    this.formuleForm.addControl(
      'ageGroup',
      new FormControl(initialData?.ageGroup || null, Validators.required)
    );
    this.formuleForm.addControl(
      'details',
      new FormControl(initialData?.details || null, Validators.required)
    );
    this.formuleForm.addControl(
      'coupon',
      new FormControl(initialData?.coupon || false, Validators.required)
    );

    this.loading = false;
  }

  private _getFormule(formuleId: string): void {
    this.formuleService
      .getFormule(formuleId)
      .pipe(tap((result) => (this.formule = result)))
      .subscribe((formule) => {
        console.log(formule);
        this._initForm(formule);
      });
  }
}

@NgModule({
  declarations: [FormuleDialog],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    FormsModule,
  ],
  exports: [],
  providers: [],
})
class FormuleDialogModule {}
