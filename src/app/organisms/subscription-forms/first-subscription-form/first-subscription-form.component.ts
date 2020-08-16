import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';

enum AgeGroups {
  FIRST = 'Enfant né entre 2008 et 2010',
  SECOND = 'Enfant né entre 2011 et 2013',
  THIRD = 'Enfant né entre 2014 et 2015',
  FOURTH = 'Adolescent (12 ans et plus)'
}

@Component({
  selector: 'first-subscription-form',
  templateUrl: './first-subscription-form.component.html',
  styleUrls: ['../subscription-form.component.scss']
})
export class FirstSubscriptionFormComponent implements OnInit {
  @Output() sendFirstForm: EventEmitter<any> = new EventEmitter();

  public subscriptionForm: FormGroup = new FormGroup({});

  public ageGroups: AgeGroups[] = [
    AgeGroups.FIRST,
    AgeGroups.SECOND,
    AgeGroups.THIRD,
    AgeGroups.FOURTH
  ];

  public lessons: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.subscriptionForm.addControl('ageGroup', new FormControl(null, Validators.required));
    this.subscriptionForm.addControl('memberLastName', new FormControl(null, Validators.required));
    this.subscriptionForm.addControl('memberFirstName', new FormControl(null, Validators.required));
    this.subscriptionForm.addControl('birthdate', new FormControl(null, Validators.required));
    this.subscriptionForm.addControl('guardianLastName', new FormControl(null, Validators.required));
    this.subscriptionForm.addControl('guardianFirstName', new FormControl(null, Validators.required));
    this.subscriptionForm.addControl('email', new FormControl(null, [Validators.required, Validators.email]));
    this.subscriptionForm.addControl('phone', new FormControl(null, [Validators.required, Validators.minLength(10)]));
    this.subscriptionForm.addControl('details', new FormControl(null));
  }

  public onSubmit(): void {
    if (this.subscriptionForm.invalid) {
      return;
    }
    console.log(this.subscriptionForm.value.birthdate.toLocaleDateString());
    this.sendFirstForm.emit(this.subscriptionForm.value);
    console.log(this.subscriptionForm.value);
  }

  public ageGroupOptionHandler(event: { value: AgeGroups; }) {
    console.log(event.value);
    this.removeLocationControl();
    switch (event.value) {
      case AgeGroups.FIRST:
        this.lessons = [];
        this.lessons.push(
          {
            location: 'Bois-Colombes - enfants MS et GS (mercredi 17h)',
            name: 'location1'
          },
          {
            location: 'Colombes - enfants MS et GS (samedi 10h15)',
            name: 'location3'
          },
        );
        this.subscriptionForm.addControl('location1', new FormControl(null));
        this.subscriptionForm.addControl('location3', new FormControl(null));
        break;
      case AgeGroups.SECOND:
        this.lessons = [];
        this.lessons.push(
          {
            location: 'Bois-Colombes - enfants MS et GS (mercredi 17h)',
            name: 'location1'
          },
          {
            location: 'Colombes - enfants MS et GS (samedi 10h15)',
            name: 'location3'
          },

        );
        this.subscriptionForm.addControl('location1', new FormControl(null));
        this.subscriptionForm.addControl('location3', new FormControl(null));
        break;
      case AgeGroups.THIRD:
        this.lessons = [];
        this.lessons.push(
          {
            location: 'Bois-Colombes - enfants 6-10 ans (mercredi 18h)',
            name: 'location2'
          },
          {
            location: 'Colombes - enfants 6-10 ans (samedi 11h)',
            name: 'location4'
          }
        );
        this.subscriptionForm.addControl('location2', new FormControl(null));
        this.subscriptionForm.addControl('location4', new FormControl(null));
        break;
      case AgeGroups.FOURTH:
        this.lessons = [];
        break;
    }
  }

  private removeLocationControl(): void {
    this.subscriptionForm.removeControl('location1');
    this.subscriptionForm.removeControl('location2');
    this.subscriptionForm.removeControl('location3');
    this.subscriptionForm.removeControl('location4');
  }
}
