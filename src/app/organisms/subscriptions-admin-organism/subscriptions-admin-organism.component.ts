import { Component, OnInit } from '@angular/core';

import { SubscriptionService } from '../../services/subscription/subscription.service';
import { AdultData } from '../../models/adultData.model';
import { KidData } from 'src/app/models/kidData.model';
import { SubscriptionAgeMode } from 'src/app/models/SubscriptionAgeMode.enum';

@Component({
  selector: 'subscriptions-admin-organism',
  templateUrl: './subscriptions-admin-organism.component.html',
  styleUrls: ['./subscriptions-admin-organism.component.scss']
})

export class SubscriptionsAdminOrganism implements OnInit {

  public showAdultData = false;
  public showTeenData = false;
  public showElementaryData = false;
  public showNurseryData = false;

  // public adultData: AdultData[] = [];
  // public nurseryData: KidData[] = [];
  // public elementaryData: KidData[] = [];
  // public teenData: KidData[] = [];
  public membersData: any[] = [];
  public isLoading = false;

  public adultError = false;

  public subscriptionAgeMode: SubscriptionAgeMode = SubscriptionAgeMode.SubscriptionAgeModeKids;

  public ageGroups: any[] = [
    '2010 - 2014',
    '2015 - 2016',
    'Ado',
    'Adultes'
  ];

  constructor(
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this.showNurseryData = true;
    this._getNurseryData();
  }

  public ageGroupOptionHandler(event: { value: number }) {
    switch (event.value) {
      case 0:
        this.subscriptionAgeMode = SubscriptionAgeMode.SubscriptionAgeModeKids;
        this.showNurseryData = true;
        this.showElementaryData = false;
        this.showTeenData = false;
        this.showAdultData = false;
        this._getNurseryData();
        break;
      case 1:
        this.subscriptionAgeMode = SubscriptionAgeMode.SubscriptionAgeModeKids;
        this.showNurseryData = false;
        this.showElementaryData = true;
        this.showTeenData = false;
        this.showAdultData = false;
        this._getElementaryData();
        break;
      case 2:
        this.subscriptionAgeMode = SubscriptionAgeMode.SubscriptionAgeModeKids;
        this.showNurseryData = false;
        this.showElementaryData = false;
        this.showTeenData = true;
        this.showAdultData = false;
        this._getTeenData();
        break;
      case 3:
        this.subscriptionAgeMode = SubscriptionAgeMode.SubscriptionAgeModeAdults;
        this.showNurseryData = false;
        this.showElementaryData = false;
        this.showTeenData = false;
        this.showAdultData = true;
        this._getAdultData();
        break;
    }
  }

  private _getNurseryData(): void {
    this.isLoading = true;
    this.subscriptionService.getNurseryData()
      .subscribe(
        response => {
          // console.log('Nursery data :', response);
          this.isLoading = false;
          // this.nurseryData = response.data;
          this.membersData = response.data;
        },
        err => {
          console.log('get adult data error :', err);
          this.isLoading = false;
          this.adultError = true;
        }
      );
  }
  private _getElementaryData(): void {
    this.isLoading = true;
    this.subscriptionService.getElementaryData()
      .subscribe(
        response => {
          console.log('Elementary data :', response);
          this.isLoading = false;
          // this.elementaryData = response.data;
          this.membersData = response.data;
        },
        err => {
          console.log('get adult data error :', err);
          this.isLoading = false;
          this.adultError = true;
        }
      );
  }
  private _getTeenData(): void {
    this.isLoading = true;
    this.subscriptionService.getTeenData()
      .subscribe(
        response => {
          console.log('Teen data :', response);
          this.isLoading = false;
          // this.teenData = response.data;
          this.membersData = response.data;
        },
        err => {
          console.log('get adult data error :', err);
          this.isLoading = false;
          this.adultError = true;
        }
      );
  }

  private _getAdultData(): void {
    this.isLoading = true;
    this.subscriptionService.getAdultData()
      .subscribe(
        response => {
          console.log('Adult data :', response);
          this.isLoading = false;
          // this.adultData = response.data;
          this.membersData = response.data;
        },
        err => {
          console.log('get adult data error :', err);
          this.isLoading = false;
          this.adultError = true;
        }
      );
  }

}
