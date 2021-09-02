import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule } from '@angular/core';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { MaterialModule } from '../../angular-material/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogDeleteConfirm } from '../dialog-delete-confirm/dialog-delete-confirm.component';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { ActionLabel } from 'src/app/models/action-label.enum';
import { PaymentMethodEnum } from 'src/app/models/payment-method.enum';

@Component({
  selector: 'dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.scss'],
})
export class DialogUser {
  public user: User;
  public userId: string;
  public userForm: FormGroup = new FormGroup({});
  public loading = false;
  public paymentMethodsEnum = PaymentMethodEnum;
  public paymentMethods = Object.values(PaymentMethodEnum);

  public readonly DIALOG_TITLE = "Modifier l'utilisateur :";

  public user$: Observable<User>;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public dialogRef: MatDialogRef<DialogUser>,
    @Inject(MAT_DIALOG_DATA)
    public data: { userId: string }
  ) {
    this.loading = true;
    this.userId = data.userId;
    this.user$ = this.authService.getUser(data.userId).pipe(
      finalize(() => (this.loading = false)),
      map((res) => res.user),
      tap((user) => this._initUserForm(user)),
      tap((user) => {
        this.user = user;
      })
    );
  }

  public onCancel(): void {
    this.dialogRef.close({ action: ActionLabel.CANCEL });
  }

  public onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    this.user = this.userForm.value;
    this.user._id = this.userId;

    this.dialogRef.close({ action: ActionLabel.CONFIRM, user: this.user });
  }

  public onDeleteUser(): void {
    const dialogRef = this.dialog.open(DialogDeleteConfirm, {
      minHeight: '200px',
      data: `${this.user.firstName} ${this.user.lastName}`,
    });
    dialogRef.beforeClosed().subscribe((result) => {
      if (result && result.action === ActionLabel.CONFIRM) {
        this.loading = true;
        this.dialogRef.close({
          action: ActionLabel.DELETE,
          userId: this.userId,
        });
      }
    });
  }

  ////////////
  // PRIVATE
  ////////////

  private _initUserForm(userData: User): void {
    this.userForm = this.formBuilder.group({
      firstName: this.formBuilder.control(userData.firstName, [
        Validators.required,
      ]),
      lastName: this.formBuilder.control(userData.lastName, [
        Validators.required,
      ]),
      email: this.formBuilder.control(
        { value: userData.email, disabled: true },
        [Validators.required, Validators.email]
      ),
      signUpDate: this.formBuilder.control(
        {
          value: new Date(userData.signUpDate).toLocaleDateString(),
          disabled: true,
        },
        [Validators.required]
      ),
      paymentMade: this.formBuilder.control(userData.paymentMade, [
        Validators.required,
      ]),
      paymentMethod: this.formBuilder.control(userData.paymentMethod, [
        Validators.required,
      ]),
      checkAmount: this.formBuilder.control(userData.checkAmount),
      cashAmount: this.formBuilder.control(userData.cashAmount),
      pass92Amount: this.formBuilder.control(userData.pass92Amount),
      holidayCheckAmount: this.formBuilder.control(userData.holidayCheckAmount),
      cardAmount: this.formBuilder.control(userData.cardAmount),
      extraInfo: this.formBuilder.control(userData.extraInfo),
    });
  }
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    FormsModule,
  ],
})
class DialogModule {}
