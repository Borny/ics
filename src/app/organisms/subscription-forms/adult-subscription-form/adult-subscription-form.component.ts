import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdultFormData } from '../../../models/adultFormData.model';

@Component({
  selector: 'adult-subscription-form',
  templateUrl: './adult-subscription-form.component.html',
  styleUrls: ['../subscription-form.component.scss']
})
export class AdultSubscriptionFormComponent implements OnInit {
  @Output() sendAdultForm: EventEmitter<AdultFormData> = new EventEmitter<AdultFormData>();

  public subscriptionForm: FormGroup = new FormGroup({});

  constructor() { }

  ngOnInit(): void {
    this.subscriptionForm.addControl('memberLastName', new FormControl(null, Validators.required));
    this.subscriptionForm.addControl('memberFirstName', new FormControl(null, Validators.required));
    this.subscriptionForm.addControl('birthdate', new FormControl(null, Validators.required));
    this.subscriptionForm.addControl('email', new FormControl(null, Validators.required));
    this.subscriptionForm.addControl('phone', new FormControl(null, Validators.minLength(10)));
    this.subscriptionForm.addControl('imageRights', new FormControl(false));
    this.subscriptionForm.addControl('extraInfo', new FormControl(null));
  }

  // ngOnInit(): void {
  //   this.subscriptionForm.addControl('memberLastName', new FormControl(null, Validators.required));
  //   this.subscriptionForm.addControl('memberFirstName', new FormControl(null));
  //   this.subscriptionForm.addControl('birthdate', new FormControl(null));
  //   this.subscriptionForm.addControl('email', new FormControl(null));
  //   this.subscriptionForm.addControl('phone', new FormControl(null));
  //   this.subscriptionForm.addControl('extraInfo', new FormControl(null));
  // }

  public onSubmit(): void {
    if (this.subscriptionForm.invalid) {
      return;
    }
    // Editing the birthdate format
    this.subscriptionForm.patchValue({
      birthdate: this.subscriptionForm.value.birthdate.toLocaleDateString()
    });
    this.sendAdultForm.emit(this.subscriptionForm.value);
  }

}
