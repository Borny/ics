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
import { MaterialModule } from 'src/app/angular-material/angular-material.module';

import { Formule } from '../../../models/formule.models';

@Component({
  selector: 'formule-dialog',
  templateUrl: './formule-dialog.component.html',
  styleUrls: ['./formule-dialog.component.scss'],
})
export class FormuleDialog {
  public formule: Formule;
  public formuleId: string;
  public formuleForm: FormGroup = new FormGroup({});

  public readonly CONFIRM = 'confirm';
  public readonly CANCEL = 'cancel';

  constructor(
    public dialogRef: MatDialogRef<FormuleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.formuleId = data;
    // this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this._initForm();
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    if (this.formuleForm.invalid) {
      return;
    }
    this.formule = this.formuleForm.value;
    this.dialogRef.close({ action: this.CONFIRM, formule: this.formule });
    // console.log(this.formuleForm.value);
  }

  private _initForm(formData?: Formule): void {
    this.formuleForm.addControl(
      'title',
      new FormControl(null, Validators.required)
    );
    this.formuleForm.addControl(
      'price',
      new FormControl(null, Validators.required)
    );
    this.formuleForm.addControl(
      'details',
      new FormControl(null, Validators.required)
    );
    this.formuleForm.addControl(
      'coupon',
      new FormControl(null, Validators.required)
    );
  }
}

@NgModule({
  declarations: [FormuleDialog],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, FormsModule],
  exports: [],
  providers: [],
})
class FormuleDialogModule {}
