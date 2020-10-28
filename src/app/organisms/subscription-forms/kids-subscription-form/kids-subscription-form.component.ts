import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AgeGroups } from '../../../models/ageGroup.enum';
import { Lesson } from '../../../models/lesson.model';
import { requireCheckboxesToBeCheckedValidator } from '../../../validators/checkbox';
import { KidsFormData } from '../../../models/kidsFormData.model';

@Component({
  selector: 'kids-subscription-form',
  templateUrl: './kids-subscription-form.component.html',
  styleUrls: ['../subscription-form.component.scss']
})
export class KidsSubscriptionFormComponent implements OnInit {
  @Output() sendKidsForm: EventEmitter<KidsFormData> = new EventEmitter();

  public subscriptionForm: FormGroup = new FormGroup({});
  public locationsForm: FormGroup = new FormGroup({}, { validators: requireCheckboxesToBeCheckedValidator() });

  public showSecondLegalGuardian = false;

  public ageGroups: AgeGroups[] = [
    AgeGroups.FIRST,
    AgeGroups.SECOND,
    AgeGroups.THIRD
  ];

  public lessonsToDisplay: Lesson[] = [];

  private _lessons: Lesson[] = [
    {
      location: 'Bois-Colombes - enfants MS et GS (mercredi 17h)',
      name: 'location1'
    },
    {
      location: 'Bois-Colombes - enfants 6-10 ans (mercredi 18h)',
      name: 'location2'
    },
    {
      location: 'Colombes - enfants MS et GS (samedi 10h15)',
      name: 'location3'
    },
    {
      location: 'Colombes - enfants 6-10 ans (samedi 11h)',
      name: 'location4'
    }
  ];

  private _secondGuardianControls: string[] = [
    'secondGuardianFirstName',
    'secondGuardianLastName',
    'secondGuardianEmail',
    'secondGuardianPhone'
  ];

  constructor() { }

  ngOnInit(): void {
    this._initializeSubscriptionForm();
  }

  public onSubmit(): void {
    if (this.subscriptionForm.invalid) {
      return;
    }
    // Editing the birthdate format
    this.subscriptionForm.patchValue({
      birthdate: this.subscriptionForm.value.birthdate.toLocaleDateString('fr-FR')
    });

    // Mapping the locations values
    if (this.locationsForm.contains('location1')) {
      this.locationsForm.patchValue({
        location1: this._lessons[0].location
      });
    }
    if (this.locationsForm.contains('location2')) {
      this.locationsForm.patchValue({
        location2: this._lessons[1].location
      });
    }
    if (this.locationsForm.contains('location3')) {
      this.locationsForm.patchValue({
        location3: this._lessons[2].location
      });
    }
    if (this.locationsForm.contains('location4')) {
      this.locationsForm.patchValue({
        location4: this._lessons[3].location
      });
    }

    this.sendKidsForm.emit(this.subscriptionForm.value);
  }

  public ageGroupOptionHandler(event: { value: number; }) {
    switch (event.value) {
      case 0:
        this.locationsForm.addControl(this._lessons[0].name, new FormControl(false));
        this.locationsForm.addControl(this._lessons[2].name, new FormControl(false));
        this.subscriptionForm.addControl('lessonLocations', this.locationsForm);
        this.lessonsToDisplay = [];
        this.lessonsToDisplay.push(this._lessons[0]);
        this.lessonsToDisplay.push(this._lessons[2]);
        break;
      case 1:
        this.locationsForm.addControl(this._lessons[1].name, new FormControl(false));
        this.locationsForm.addControl(this._lessons[3].name, new FormControl(false));
        this.subscriptionForm.addControl('lessonLocations', this.locationsForm);
        this.lessonsToDisplay = [];
        this.lessonsToDisplay.push(this._lessons[1]);
        this.lessonsToDisplay.push(this._lessons[3]);
        break;
      case 2:
        if (this.subscriptionForm.contains('lessonLocations')) {
          this.subscriptionForm.removeControl('lessonLocations');
        }
        this.lessonsToDisplay = [];
        break;
    }
  }

  public toggleShowSecondLegalGuardian(checked: boolean): void {
    this.showSecondLegalGuardian = checked;
    checked
      ?
      this._addControl(this._secondGuardianControls)
      :
      this._removeControl(this._secondGuardianControls);
  }

  ////////////
  // PRIVATE
  ////////////

  private _initializeSubscriptionForm(): void {
    this.subscriptionForm.addControl('ageGroup', new FormControl(null, Validators.required));
    this.subscriptionForm.addControl('memberLastName', new FormControl(null, Validators.required));
    this.subscriptionForm.addControl('memberFirstName', new FormControl(null, Validators.required));
    this.subscriptionForm.addControl('birthdate', new FormControl(null, Validators.required));
    this.subscriptionForm.addControl('guardianLastName', new FormControl(null, Validators.required));
    this.subscriptionForm.addControl('guardianFirstName', new FormControl(null, Validators.required));
    this.subscriptionForm.addControl('guardianEmail', new FormControl(null, [Validators.required, Validators.email]));
    this.subscriptionForm.addControl('guardianPhone', new FormControl(null, [Validators.required, Validators.minLength(10)]));
    this.subscriptionForm.addControl('imageRights', new FormControl(false));
    this.subscriptionForm.addControl('extraInfo', new FormControl(''));
    this.subscriptionForm.addControl('firstSubscription', new FormControl(true, Validators.required));
  }

  private _addControl(controls: string[], required?: boolean): void {
    controls.forEach(control => {
      this.subscriptionForm.addControl(control, new FormControl(null));
      if (required) {
        this.subscriptionForm.controls[control].setValidators([Validators.required]);
      }
      if (control === 'email' || control === 'secondGuardianEmail') {
        this.subscriptionForm.controls[control].setValidators([Validators.required, Validators.email]);
      }
      if (control === 'phone' || control === 'secondGuardianPhone') {
        this.subscriptionForm.controls[control].setValidators([Validators.required, Validators.minLength(10)]);
      }
    });
  }

  private _removeControl(controls: string[]): void {
    controls.forEach(control => this.subscriptionForm.removeControl(control));
  }
}
