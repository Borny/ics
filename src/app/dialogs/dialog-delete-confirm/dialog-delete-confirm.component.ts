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

@Component({
  selector: 'dialog-delete-confirm',
  templateUrl: './dialog-delete-confirm.component.html',
  styleUrls: ['./dialog-delete-confirm.component.scss'],
})
export class DialogDeleteConfirm {
  public title: string;

  public readonly CONFIRM = 'confirm';
  public readonly CANCEL = 'cancel';

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteConfirm>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.title = data;
  }

  ngOnInit(): void {}

  public onCancel(): void {
    this.dialogRef.close({action: this.CANCEL});
  }

  public onConfirm(): void {
    this.dialogRef.close({ action: this.CONFIRM });
  }
}

@NgModule({
  declarations: [DialogDeleteConfirm],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, FormsModule],
  exports: [],
  providers: [],
})
class DialogDeleteConfirmModule {}
