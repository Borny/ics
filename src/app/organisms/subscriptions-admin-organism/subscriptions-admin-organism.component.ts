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
  // public showAdultData = false;
  // public showTeenData = false;
  // public showElementaryData = false;
  // public showNurseryData = false;

  public name: string;

  public adultData: AdultSubscription[] = [];
  public kidData: KidSubscription[] = [];
  // public elementaryData: KidData[] = [];
  // public teenData: KidData[] = [];

  public formules: Formule[];

  public formules$: Observable<Formule[]>;

  public ageGroupEnum = AgeGroupEnum;

  public membersData: any[] = [];
  public isLoading = false;

  private readonly _ADMIN_MODE = 'admin';

  // public adultError = false;

  public subscriptionAgeMode: SubscriptionAgeMode =
    SubscriptionAgeMode.SubscriptionAgeModeKids;

  // public ageGroups: any[] = [
  //   '2010 - 2014',
  //   '2015 - 2016',
  //   'Ado',
  //   'Adultes'
  // ];

  constructor(
    private subscriptionService: SubscriptionService,
    public dialog: MatDialog,
    private formuleService: FormuleService
  ) {}

  ngOnInit(): void {
    // this.showNurseryData = true;
    // this._getNurseryData();
    // this._getKidSubscriptions();
    // this._getAdultSubscriptions();
    this._getFormules();
  }

  public formuleOptionHandler(event: {
    value: { formId: string; formuleAge: AgeGroupEnum };
  }) {
    // console.log(event.value.formuleId, event.value.formuleAge);
    const { formId, formuleAge } = event.value;
    if (formuleAge === this.ageGroupEnum.ADULTS) {
      console.log('adult');

      this.subscriptionAgeMode = SubscriptionAgeMode.SubscriptionAgeModeAdults;
      this.membersData = this.adultData.filter(
        ({ formuleId }) => formuleId === formId
      );
    } else {
      console.log('teen or kids');

      this.subscriptionAgeMode = SubscriptionAgeMode.SubscriptionAgeModeKids;
      this.membersData = this.kidData.filter(
        ({ formuleId }) => formuleId === formId
      );
    }
    //   switch (event.value) {
    //     case 0:
    //       this.subscriptionAgeMode = SubscriptionAgeMode.SubscriptionAgeModeKids;
    //       this.showNurseryData = true;
    //       this.showElementaryData = false;
    //       this.showTeenData = false;
    //       this.showAdultData = false;
    //       this._getNurseryData();
    //       break;
    //     case 1:
    //       this.subscriptionAgeMode = SubscriptionAgeMode.SubscriptionAgeModeKids;
    //       this.showNurseryData = false;
    //       this.showElementaryData = true;
    //       this.showTeenData = false;
    //       this.showAdultData = false;
    //       this._getElementaryData();
    //       break;
    //     case 2:
    //       this.subscriptionAgeMode = SubscriptionAgeMode.SubscriptionAgeModeKids;
    //       this.showNurseryData = false;
    //       this.showElementaryData = false;
    //       this.showTeenData = true;
    //       this.showAdultData = false;
    //       this._getTeenData();
    //       break;
    //     case 3:
    //       this.subscriptionAgeMode = SubscriptionAgeMode.SubscriptionAgeModeAdults;
    //       this.showNurseryData = false;
    //       this.showElementaryData = false;
    //       this.showTeenData = false;
    //       this.showAdultData = true;
    //       this._getAdultData();
    //       break;
    //   }
  }

  private _getKidSubscriptions(): void {
    this.subscriptionService
      .getKidData()
      .subscribe((kidData: KidSubscription[]) => {
        console.log('kid data', kidData);
        this.kidData = kidData;
      });
  }

  private _getAdultSubscriptions(): void {
    this.subscriptionService
      .getAdultData()
      .subscribe((adultData: AdultSubscription[]) => {
        console.log('adult data', adultData);
        this.adultData = adultData;
        console.log(this.adultData);
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

  // private _getNurseryData(): void {
  //   this.isLoading = true;
  //   this.subscriptionService.getNurseryData()
  //     .subscribe(
  //       response => {
  //         // console.log('Nursery data :', response);
  //         this.isLoading = false;
  //         // this.nurseryData = response.data;
  //         this.membersData = response.data;
  //       },
  //       err => {
  //         console.log('get adult data error :', err);
  //         this.isLoading = false;
  //         this.adultError = true;
  //       }
  //     );
  // }
  // private _getElementaryData(): void {
  //   this.isLoading = true;
  //   this.subscriptionService.getElementaryData()
  //     .subscribe(
  //       response => {
  //         console.log('Elementary data :', response);
  //         this.isLoading = false;
  //         // this.elementaryData = response.data;
  //         this.membersData = response.data;
  //       },
  //       err => {
  //         console.log('get adult data error :', err);
  //         this.isLoading = false;
  //         this.adultError = true;
  //       }
  //     );
  // }
  // private _getTeenData(): void {
  //   this.isLoading = true;
  //   this.subscriptionService.getTeenData()
  //     .subscribe(
  //       response => {
  //         console.log('Teen data :', response);
  //         this.isLoading = false;
  //         // this.teenData = response.data;
  //         this.membersData = response.data;
  //       },
  //       err => {
  //         console.log('get adult data error :', err);
  //         this.isLoading = false;
  //         this.adultError = true;
  //       }
  //     );
  // }

  // private _getAdultData(): void {
  //   this.isLoading = true;
  //   this.subscriptionService.getAdultData()
  //     .subscribe(
  //       response => {
  //         console.log('Adult data :', response);
  //         this.isLoading = false;
  //         // this.adultData = response.data;
  //         this.membersData = response.data;
  //       },
  //       err => {
  //         console.log('get adult data error :', err);
  //         this.isLoading = false;
  //         this.adultError = true;
  //       }
  //     );
  // }
}
