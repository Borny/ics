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
import { Action } from 'rxjs/internal/scheduler/Action';
import { MaterialModule } from 'src/app/angular-material/angular-material.module';
import { ActionLabel } from 'src/app/models/action-label.enum';

@Component({
  selector: 'dialog-delete-confirm',
  templateUrl: './dialog-delete-confirm.component.html',
  styleUrls: ['./dialog-delete-confirm.component.scss'],
})
export class DialogDeleteConfirm {
  public title: string;

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteConfirm>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.title = data;
  }

  ngOnInit(): void {}

  public onCancel(): void {
    this.dialogRef.close({ action: ActionLabel.CANCEL });
  }

  public onConfirm(): void {
    this.dialogRef.close({ action: ActionLabel.CONFIRM });
  }
}

@NgModule({
  declarations: [DialogDeleteConfirm],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, FormsModule],
  exports: [],
  providers: [],
})
class DialogDeleteConfirmModule {}
