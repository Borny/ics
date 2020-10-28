import { Component, OnInit } from '@angular/core';

import { SubscriptionService } from '../../services/subscription/subscription.service';
import { AdultFormData } from '../../models/adultFormData.model';
import { KidsFormData } from '../../models/kidsFormData.model';
import { ClassDeals } from '../../models/classDeals.model';
import { SubscriptionType } from '../../models/subscriptionType.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'subscription',
  templateUrl: 'subscription.component.html',
  styleUrls: ['subscription.component.scss']
})
export class SubscriptionView implements OnInit {

  public isLoading = false;
  public showDealOptions = true;
  public formSentSuccess = false;
  public formSentFailed = false;

  public readonly HOME_BTN_TEXT = 'Accueil';
  public readonly PROGRAM_BTN_TEXT = 'Nos programmes';
  public readonly RELOAD_BTN_TEXT = 'Réessayer';

  public showKidForm: boolean;
  public showAdultForm: boolean;

  public subscriptionForms: any[] = [
    {
      title: 'Inscription enfant / ado',
      subscriptionType: SubscriptionType.SubscriptionFirst
    },
    {
      title: 'Inscription  Adulte',
      subscriptionType: SubscriptionType.SubscriptionAdult
    },
  ]

  public classDeals: ClassDeals[] = [
    {
      title: '1ère inscription',
      option: 'Inscription enfant / ado',
      description: 'enfants et adolescents : ateliers, passage de corde, uniforme (t-shirt/pantalon)',
      price: 290,
      subscriptionType: SubscriptionType.SubscriptionFirst
    },
    {
      title: 'Ré-inscription',
      option: 'Ré-inscription enfant / ado',
      description: 'enfants et adolescents : ateliers, passage de corde',
      price: 250,
      subscriptionType: SubscriptionType.SubscriptionRenewal
    },
    {
      title: 'Inscription adultes : ',
      option: 'Inscription Adulte',
      description: 'ateliers, festival mai 2021',
      price: 320,
      subscriptionType: SubscriptionType.SubscriptionAdult
    }
  ];

  constructor(
    private subscriptionService: SubscriptionService,
    private router: Router) { }

  ngOnInit() {
  }

  public addSubscription(event: Event): void {
  }

  public subscriptionFormsOptionHandler(event: { value: ClassDeals }): void {
    console.log(event);
    switch (event.value.subscriptionType) {
      case 0:
        this.showKidForm = true;
        this.showAdultForm = false;
        break;
      case 2:
        this.showKidForm = false;
        this.showAdultForm = true;
        break;
    }
  }

  public sendFirstForm(formData: KidsFormData): void {
    this.isLoading = true;
    this.showDealOptions = false;
    this._hideAllForms();
    console.log(formData)
    this.subscriptionService.sendKidsForm(formData)
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

  public sendAdultForm(data: AdultFormData): void {
    this.isLoading = true;
    this.showDealOptions = false;
    this._hideAllForms();
    this.subscriptionService.sendAdultForm(data)
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

  // NAVIGATION

  public onNavigateHome(event: Event): void {
    this.router.navigateByUrl('/accueil');
  }

  public onNavigatePrograms(event: Event): void {
    this.router.navigateByUrl('/programmes');
  }

  // Reload page
  public onReloadPage(event: Event): void {
    location.reload();
  }

  ////////////
  // PRIVATE
  ////////////
  private _hideAllForms(): void {
    this.showKidForm = false;
    this.showAdultForm = false;
  }

}
