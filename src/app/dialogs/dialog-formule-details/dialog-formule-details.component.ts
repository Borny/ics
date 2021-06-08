import { CommonModule } from '@angular/common';
import { Component, Inject, Input, NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MaterialModule } from 'src/app/angular-material/angular-material.module';
import { AgeGroupEnum } from 'src/app/models/age-group.enum';
import { Formule } from 'src/app/models/formule.models';

@Component({
  selector: 'dialog-formule-details',
  templateUrl: './dialog-formule-details.component.html',
  styleUrls: ['./dialog-formule-details.component.scss'],
})
export class DialogFormuleDetails {
  public formule: Formule;
  public ageGroup = AgeGroupEnum;

  public readonly CANCEL = 'cancel';

  constructor(
    public dialogRef: MatDialogRef<DialogFormuleDetails>,
    @Inject(MAT_DIALOG_DATA) public data: Formule
  ) {
    this.formule = data;
  }

  public onCancel(): void {
    this.dialogRef.close({ action: this.CANCEL });
  }
}

@NgModule({
  declarations: [DialogFormuleDetails],
  imports: [CommonModule, MaterialModule],
  exports: [],
  providers: [],
})
class DialogFormuleDetailsModule {}
