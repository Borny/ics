import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DialogUser } from 'src/app/dialogs/dialog-user/dialog-user.component';
import { ActionLabel } from 'src/app/models/action-label.enum';
import { PaymentMethodEnum } from 'src/app/models/payment-method.enum';

import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'organism-table-users',
  templateUrl: './organism-table-users.component.html',
  styleUrls: ['./organism-table-users.component.scss'],
})
export class OrganismTableUsers {
  @Input() users$: Observable<User[]>;
  @Output() updateTable$: EventEmitter<any> = new EventEmitter();

  private _paymentMethodsEnum = PaymentMethodEnum;

  constructor(public dialog: MatDialog, private authService: AuthService) {}

  public getPaymentMethodValue(user: User): string {
    let value;
    if (user.paymentMethod === this._paymentMethodsEnum.CARD) {
      value = 'Carte';
    } else if (user.paymentMethod === this._paymentMethodsEnum.OTHER) {
      value = 'Autre';
    } else if (user.paymentMethod === this._paymentMethodsEnum.MULTIPLE) {
      value = 'Multiple';
    }
    return value;
  }

  public onOpenModalUpdate(user: User): void {
    const dialogRef = this.dialog.open(DialogUser, {
      minWidth: '320px',
      maxWidth: '600px',
      width: '100%',
      data: { userId: user._id },
    });
    dialogRef.beforeClosed().subscribe((result) => {
      if (result.action === ActionLabel.CONFIRM) {
        this.authService
          .updateUser(result.user)
          .pipe(tap(() => this.updateTable$.emit()))
          .subscribe();
      } else if (result.action === ActionLabel.DELETE) {
        console.log('delete', result.userId);
        this.authService
          .deleteUser(result.userId)
          .pipe(tap(() => this.updateTable$.emit()))
          .subscribe();
      }
    });
  }
}
