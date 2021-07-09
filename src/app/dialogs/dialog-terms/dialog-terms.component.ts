import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/angular-material/angular-material.module';

@Component({
  selector: 'dialog-terms',
  templateUrl: './dialog-terms.component.html',
  styleUrls: ['./dialog-terms.component.scss'],
})
export class DialogTerms {
  public readonly CONFIRM = 'confirm';
  public readonly CANCEL = 'cancel';

  constructor(public dialogRef: MatDialogRef<DialogTerms>) {}

  ngOnInit(): void {}

  public onCancel(): void {
    this.dialogRef.close({ action: this.CANCEL });
  }

  public onDownload(): void {
    this.dialogRef.close();
  }
}

@NgModule({
  declarations: [DialogTerms],
  imports: [CommonModule, MaterialModule],
  exports: [],
  providers: [],
})
class DialogTermsModule {}
