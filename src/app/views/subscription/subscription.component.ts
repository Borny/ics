import { Component, OnInit } from '@angular/core';

import { SubscriptionService } from '../../services/subscription/subscription.service';

enum subscriptionType {
  SubscriptionFirst,
  SubscriptionRenewal,
  SubscriptionAdult
}

@Component({
  selector: 'subscription',
  templateUrl: 'subscription.component.html',
  styleUrls: ['subscription.component.scss']
})
export class SubscriptionView implements OnInit {

  public isLoading = false;
  public formSentSuccess = false;
  public formSentFailed = false;

  public showFirstForm: boolean;
  public showSecondForm: boolean;
  public showThirdForm: boolean;

  public deals: any[] = [
    {
      title: '1ère inscription',
      option: 'Inscription enfant / ado',
      description: 'enfants et adolescents : ateliers, passage de corde, uniforme (t-shirt/pantalon)',
      price: 290,
      subscriptionType: subscriptionType.SubscriptionFirst
    },
    {
      title: 'Ré-inscription',
      option: 'Ré-inscription enfant / ado',
      description: 'enfants et adolescents : ateliers, passage de corde',
      price: 250,
      subscriptionType: subscriptionType.SubscriptionRenewal
    },
    {
      title: 'Inscription adultes : ',
      option: 'Inscription Adulte',
      description: 'ateliers, festival mai 2021',
      price: 350,
      subscriptionType: subscriptionType.SubscriptionAdult
    }
  ];

  constructor(private subscriptionService: SubscriptionService) { }

  ngOnInit() {

  }

  public addSubscription(event: Event): void {

  }

  public dealOptionHandler(event): void {
    console.log(event.value.subscriptionType);
    switch (event.value.subscriptionType) {
      case 0:
        this.showFirstForm = true;
        this.showSecondForm = false;
        this.showThirdForm = false;
        break;
      case 1:
        this.showFirstForm = false;
        this.showSecondForm = true;
        this.showThirdForm = false;
        break;
      case 2:
        this.showFirstForm = false;
        this.showSecondForm = false;
        this.showThirdForm = true;
        break;
    }
  }

  public sendFirstForm(event: Event): void {
    console.log(event);
    this.isLoading = true;
    this.showFirstForm = false;
    this.showSecondForm = false;
    this.showThirdForm = false;
    this.subscriptionService.sendFirstForm(event)
      .subscribe(
        response => {
          console.log(response);
          this.isLoading = false;
          this.formSentSuccess = true;
        },
        error => {
          console.log('send form error :', error);
          this.isLoading = false;
          this.formSentFailed = true;
        }
      );
  }

  public sendRenewalForm(event: Event): void {
    console.log(event);
    this.isLoading = true;
    this.showFirstForm = false;
    this.showSecondForm = false;
    this.showThirdForm = false;
    this.subscriptionService.sendRenewalForm(event)
      .subscribe(
        response => {
          console.log(response);
          this.isLoading = false;
          this.formSentSuccess = true;
        },
        error => {
          console.log('send form error :', error);
          this.isLoading = false;
          this.formSentFailed = true;
        }
      );
  }

  public sendAdultForm(event: Event): void {
    console.log('send adult form :', event);
    this.isLoading = true;
    this.showFirstForm = false;
    this.showSecondForm = false;
    this.showThirdForm = false;
    this.subscriptionService.sendAdultForm(event)
      .subscribe(
        response => {
          console.log('adult form response :', response);
          this.isLoading = false;
          this.formSentSuccess = true;
        },
        error => {
          console.log('adult form error :', error);
          this.isLoading = false;
          this.formSentFailed = true;
        }
      );
  }
}
