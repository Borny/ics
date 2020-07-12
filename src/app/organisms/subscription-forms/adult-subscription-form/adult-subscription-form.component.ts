import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'adult-subscription-form',
  templateUrl: './adult-subscription-form.component.html',
  styleUrls: ['../subscription-form.component.scss']
})
export class AdultSubscriptionFormComponent implements OnInit {

  public subscriptionForm: FormGroup = new FormGroup({});

  // public locations: any[] = [
  //   'Colombes - Adolescents (lundi 19h, mercredi 19h30, vendredi 19h30)',
  //   'Colombes - enfants MS et GS (samedi 10h15)',
  //   'Colombes - enfants 6-10 ans (samedi 11h)',
  //   'Bois-Colombes - enfants MS et GS (mercredi 17h)',
  //   'Bois-Colombes - enfants 6-10 ans (mercredi 18h)'
  // ];

  constructor() { }

  ngOnInit(): void {
    this.subscriptionForm.addControl('memberLastName', new FormControl(null, Validators.required));
    this.subscriptionForm.addControl('memberFirstName', new FormControl(null, Validators.required));
    this.subscriptionForm.addControl('birthdate', new FormControl(null, Validators.required));
    this.subscriptionForm.addControl('email', new FormControl(null, Validators.required));
    this.subscriptionForm.addControl('phone', new FormControl(null, Validators.required));
    this.subscriptionForm.addControl('details', new FormControl(null));
  }

  public onSubmit(): void { }

}
