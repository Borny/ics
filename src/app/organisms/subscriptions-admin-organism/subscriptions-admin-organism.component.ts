import { Component, OnInit } from '@angular/core';

import { SubscriptionService } from '../../services/subscription/subscription.service';
import { SubscriptionAgeMode } from 'src/app/models/SubscriptionAgeMode.enum';
import { AgeGroupEnum } from 'src/app/models/age-group.enum';
import { MatDialog } from '@angular/material/dialog';
import { FormuleService } from 'src/app/services/formule/formule.service';
import { Observable } from 'rxjs';
import { Formule } from 'src/app/models/formule.models';
import { finalize, tap } from 'rxjs/operators';
import { AdultSubscription } from 'src/app/models/adultSubscription.model';
import { KidSubscription } from 'src/app/models/kidSubscription.model';

@Component({
  selector: 'subscriptions-admin-organism',
  templateUrl: './subscriptions-admin-organism.component.html',
  styleUrls: ['./subscriptions-admin-organism.component.scss'],
})
export class SubscriptionsAdminOrganism implements OnInit {
  public name: string;
  public adultData: AdultSubscription[] = [];
  public kidData: KidSubscription[] = [];
  public formules: Formule[];
  public ageGroupEnum = AgeGroupEnum;
  public membersData: any[] = [];
  public isLoading = false;

  public formules$: Observable<Formule[]>;

  private readonly _ADMIN_MODE = 'admin';

  public subscriptionAgeMode: SubscriptionAgeMode =
    SubscriptionAgeMode.SubscriptionAgeModeKids;

  constructor(
    private subscriptionService: SubscriptionService,
    public dialog: MatDialog,
    private formuleService: FormuleService
  ) {}

  ngOnInit(): void {
    this._getFormules();
  }

  public formuleOptionHandler(event: { value: any }) {
    console.log(event);
    const { _id, ageGroup } = event.value;
    if (ageGroup === this.ageGroupEnum.ADULTS) {
      this.subscriptionAgeMode = SubscriptionAgeMode.SubscriptionAgeModeAdults;
      this.membersData = this.adultData.filter(
        ({ formuleId }) => formuleId === _id
      );
    } else {
      this.subscriptionAgeMode = SubscriptionAgeMode.SubscriptionAgeModeKids;
      this.membersData = this.kidData.filter(
        ({ formuleId }) => formuleId === _id
      );
    }
  }

  private _getKidSubscriptions(): void {
    this.subscriptionService
      .getKidData()
      .subscribe((kidData: KidSubscription[]) => {
        this.kidData = kidData;
      });
  }

  private _getAdultSubscriptions(): void {
    this.subscriptionService
      .getAdultData()
      .subscribe((adultData: AdultSubscription[]) => {
        this.adultData = adultData;
      });
  }

  private _getFormules(): void {
    this.isLoading = true;
    this.formules$ = this.formuleService.getFormules(this._ADMIN_MODE).pipe(
      finalize(() => (this.isLoading = false)),
      tap((formules) => (this.formules = formules)),
      tap(() => this._getKidSubscriptions()),
      tap(() => this._getAdultSubscriptions())
    );
  }
}
