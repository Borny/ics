import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
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
  @Input() users: User[];
  @Output() updateTable$: EventEmitter<any> = new EventEmitter();

  public search = '';

  private _paymentMethodsEnum = PaymentMethodEnum;

  constructor(public dialog: MatDialog, private authService: AuthService) {}

  public onSearch(): void {
    if (this.search.trim() === '') {
      return;
    }
    this.users$ = of(
      this.users.filter((user) => {
        const searchTerm = this.search.trim().toLowerCase();
        return (
          user.email === searchTerm ||
          user.firstName.toLowerCase() === searchTerm ||
          user.lastName.toLowerCase() === searchTerm
        );
      })
    );
  }

  public onClearInput(): void {
    this.search = '';
    this.users$ = of(this.users);
  }

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
        this.authService
          .deleteUser(result.userId)
          .pipe(tap(() => this.updateTable$.emit()))
          .subscribe();
      }
    });
  }
}
