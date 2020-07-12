import { Component, OnInit } from '@angular/core';

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
      option: 'Adulte',
      description: 'ateliers, festival mai 2021',
      price: 350,
      subscriptionType: subscriptionType.SubscriptionAdult
    }
  ];

  constructor() { }

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
}
