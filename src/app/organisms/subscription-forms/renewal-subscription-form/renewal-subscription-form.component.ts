import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

enum AgeGroups {
  FIRST = 'Enfant né en 2014 et 2015',
  SECOND = 'Enfant né entre 2011 et 2013',
  THIRD = 'Enfant né entre 2008 et 2010',
  FOURTH = 'Adolescent (12 ans et plus)'
}

@Component({
  selector: 'renewal-subscription-form',
  templateUrl: './renewal-subscription-form.component.html',
  styleUrls: ['../subscription-form.component.scss']
})
export class RenewalSubscriptionFormComponent implements OnInit {

  public subscriptionForm: FormGroup = new FormGroup({});

  public ageGroups: any[] = [
    AgeGroups.FIRST,
    AgeGroups.SECOND,
    AgeGroups.THIRD,
    AgeGroups.FOURTH
  ];

  public locations: any[] = [
    'Colombes - Adolescents (lundi 19h, mercredi 19h30, vendredi 19h30)',
    'Colombes - enfants MS et GS (samedi 10h15)',
    'Colombes - enfants 6-10 ans (samedi 11h)',
    'Bois-Colombes - enfants MS et GS (mercredi 17h)',
    'Bois-Colombes - enfants 6-10 ans (mercredi 18h)'
  ];

  constructor() { }

  ngOnInit(): void {
    this.subscriptionForm.addControl('memberLastName', new FormControl(null, Validators.required));
    this.subscriptionForm.addControl('memberFirstName', new FormControl(null, Validators.required));
    this.subscriptionForm.addControl('birthdate', new FormControl(null, Validators.required));
    this.subscriptionForm.addControl('guardianLastName', new FormControl(null, Validators.required));
    this.subscriptionForm.addControl('guardianFirstName', new FormControl(null, Validators.required));
    this.subscriptionForm.addControl('email', new FormControl(null, Validators.required));
    this.subscriptionForm.addControl('phone', new FormControl(null, Validators.required));
    this.subscriptionForm.addControl('details', new FormControl(null));
  }

  public onSubmit(): void { }

  public ageGroupOptionHandler(event) { }
}
