import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DialogUser } from 'src/app/dialogs/dialog-user/dialog-user.component';
import { ActionLabel } from 'src/app/models/action-label.enum';

import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'organism-table-users',
  templateUrl: './organism-table-users.component.html',
  styleUrls: ['./organism-table-users.component.scss'],
})
export class OrganismTableUsers implements OnInit {
  @Input() users$: Observable<User[]>;

  constructor(public dialog: MatDialog, private authService: AuthService) {}

  ngOnInit(): void {}

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
          .pipe(tap(() => location.reload()))
          .subscribe();
      } else if (result.action === ActionLabel.DELETE) {
        console.log('delete', result.userId);
        this.authService
          .deleteUser(result.userId)
          .pipe(tap(() => location.reload()))
          .subscribe();
      }
    });
  }
}
