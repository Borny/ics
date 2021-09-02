import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { AdultSubscription } from 'src/app/models/adultSubscription.model';
import { KidSubscription } from 'src/app/models/kidSubscription.model';
import { SubscriptionAgeMode } from 'src/app/models/SubscriptionAgeMode.enum';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import { DialogMember } from '../../dialogs/dialog-member/dialog-member.component';

@Component({
  selector: 'member-data-table',
  templateUrl: './member-data-table.component.html',
  styleUrls: ['./member-data-table.component.scss'],
})
export class MemberDataTable {
  @Input() membersData: AdultSubscription[] | KidSubscription[];
  @Input() subscriptionAgeMode: SubscriptionAgeMode;

  @Output() updateTable$: EventEmitter<any> = new EventEmitter();

  private readonly _DELETE = 'delete';
  private readonly _CONFIRM = 'confirm';

  constructor(
    public dialog: MatDialog,
    private subscriptionService: SubscriptionService
  ) {}

  public onOpenModalUpdate(member: AdultSubscription | KidSubscription): void {
    console.log(member);
    const dialogRef = this.dialog.open(DialogMember, {
      minWidth: '320px',
      maxWidth: '600px',
      width: '100%',
      data: { memberId: member._id, ageMode: this.subscriptionAgeMode },
    });
    dialogRef.beforeClosed().subscribe((result) => {
      if (result.action === this._CONFIRM) {
        if (
          this.subscriptionAgeMode ===
          SubscriptionAgeMode.SubscriptionAgeModeAdults
        ) {
          this.subscriptionService
            .updateAdult(result.member)
            .pipe(tap(() => this.updateTable$.emit()))
            .subscribe();
        } else if (
          this.subscriptionAgeMode ===
          SubscriptionAgeMode.SubscriptionAgeModeKids
        ) {
          this.subscriptionService
            .updateKid(result.member)
            .pipe(tap(() => this.updateTable$.emit()))
            .subscribe();
        }
      } else if (result.action === this._DELETE) {
        if (
          this.subscriptionAgeMode ===
          SubscriptionAgeMode.SubscriptionAgeModeAdults
        ) {
          this.subscriptionService
            .deleteAdult(result.memberId)
            .pipe(tap(() => this.updateTable$.emit()))
            .subscribe();
        } else if (
          this.subscriptionAgeMode ===
          SubscriptionAgeMode.SubscriptionAgeModeKids
        ) {
          this.subscriptionService
            .deleteKid(result.memberId)
            .pipe(tap(() => this.updateTable$.emit()))
            .subscribe();
        }
      }
    });
  }
}
