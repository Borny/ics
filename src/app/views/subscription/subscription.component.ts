import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

import { SubscriptionService } from '../../services/subscription/subscription.service';
import { AdultFormData } from '../../models/adultFormData.model';
import { KidsFormData } from '../../models/kidsFormData.model';
import { ClassDeals } from '../../models/classDeals.model';
import { SubscriptionType } from '../../models/subscriptionType.enum';
import { requireCheckboxesToBeCheckedValidator } from '../../validators/checkbox';

import { Formule } from 'src/app/models/formule.models';
import { FormuleService } from 'src/app/services/formule/formule.service';
import { AgeGroupEnum } from 'src/app/models/age-group.enum';
import { GenderEnum } from 'src/app/models/gender.enum';
import { DialogTerms } from 'src/app/dialogs/dialog-terms/dialog-terms.component';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'subscription',
  templateUrl: 'subscription.component.html',
  styleUrls: ['subscription.component.scss'],
})
export class SubscriptionView implements OnInit {
  public loading = false;
  public couponLoading = false;
  public formuleForm: FormGroup;
  public subscriptionForm: FormGroup = new FormGroup({});
  public subscriptionAdultForm: FormGroup = new FormGroup({});
  public subscriptionKidForm: FormGroup = new FormGroup({});
  public paymentForm: FormGroup = new FormGroup({});
  public showSubscriptionForm = false;
  public showAdultSubscriptionForm = false;
  public showKidSubscriptionForm = false;
  public genders = Object.values(GenderEnum);
  public ageGroupEnum = AgeGroupEnum;
  public totalPrice: number = 0;
  public priceOff: number = 0;
  public displayCouponInput: boolean;
  public formules: Formule[] = [];
  public selectedFormules: Formule[] = [];
  public couponError: string;
  public displayCouponError = false;
  public couponCodeValid = false;

  public formules$: Observable<Formule[]>;

  public readonly HOME_BTN_TEXT = 'Accueil';
  public readonly PROGRAM_BTN_TEXT = 'Nos programmes';
  public readonly RELOAD_BTN_TEXT = 'Réessayer';
  public readonly USER = 'user';

  constructor(
    private subscriptionService: SubscriptionService,
    private router: Router,
    public dialog: MatDialog,
    private formuleService: FormuleService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this._getFormules();
    this._initFormuleForm();
  }

  // NAVIGATION
  // public onNavigateHome(event: Event): void {
  //   this.router.navigateByUrl('/accueil');
  // }

  // public onNavigatePrograms(event: Event): void {
  //   this.router.navigateByUrl('/programmes');
  // }

  // // Reload page
  // public onReloadPage(event: Event): void {
  //   location.reload();
  // }

  get formulesArray() {
    return this.formuleForm.controls['formules'] as FormArray;
  }

  get adultsFormsArray() {
    return this.subscriptionForm.controls['adultsForms'] as FormArray;
  }

  get kidsFormsArray() {
    return this.subscriptionForm.controls['kidsForms'] as FormArray;
  }

  public onSubmitFormuleForm(): void {
    this.showSubscriptionForm = false;
    this.showAdultSubscriptionForm = false;
    this.showKidSubscriptionForm = false;
    this.selectedFormules = [];

    // Populating the selectedFormules
    this.formuleForm.value.formules.forEach(
      (formuleFormItem: Formule, idx: number) => {
        if (formuleFormItem) {
          // this.formules[idx];
          this.selectedFormules.push(this.formules[idx]);
        }
      }
    );

    // Filtering the selected adults formules
    const adultFormules = this.selectedFormules.filter(
      ({ ageGroup }) => ageGroup === this.ageGroupEnum.ADULTS
    );

    // Filtering the selected kids formules
    const kidsFormules = this.selectedFormules.filter(
      ({ ageGroup }) => ageGroup !== this.ageGroupEnum.ADULTS
    );

    // Initializing the subscription form with adultsForms and kidsForms
    this._initSubscriptionForm();

    // Populating the adults form array if any adult formule is selected
    if (adultFormules.length) {
      adultFormules.forEach((formule) => {
        let count = 1;
        while (count <= formule.formuleCount) {
          count++;
          this.adultsFormsArray.push(this._initSubscriptionAdultForm(formule));
        }
      });
      this.showAdultSubscriptionForm = true;
    }

    // Populating the kids form array if any kids formule is selected
    if (kidsFormules.length) {
      kidsFormules.forEach((formule) => {
        let count = 1;
        while (count <= formule.formuleCount) {
          count++;
          this.kidsFormsArray.push(this._initSubscriptionKidForm(formule));
        }
      });
      this.showKidSubscriptionForm = true;
    }

    this.showSubscriptionForm = true;

    // Getting the total price
    this._getTotalPrice();
  }

  public onSubmitSubscriptionForm(): void {
    console.log('submit sub form');
    console.log(this.subscriptionForm.value);
  }

  public onValidateSubscriptions(): void {}

  public onUpdateCardFormule(formule: Formule): void {
    this.formules[formule.index] = formule;
  }

  public onToggleChecked(data: {
    formule: Formule;
    formuleIndex: number;
  }): void {
    const { formule } = data;
    this.formulesArray.at(formule.index).patchValue(formule.checked);

    this.formules[formule.index] = formule;

    // console.log('formules', this.formules);
  }

  public onBackToFormules(): void {
    this.subscriptionForm.reset();
    this.formuleForm.reset();
    this.selectedFormules = [];
    this.totalPrice = 0;
    this._getFormules();
  }

  public onOpenTerms(): void {
    const dialogRef = this.dialog.open(DialogTerms, {
      minWidth: '320px',
      maxWidth: '600px',
      width: '100%',
    });
    dialogRef.beforeClosed().subscribe();
  }

  public onToggleCoupon(couponCheckbox: MatCheckboxChange): void {
    this.displayCouponInput = couponCheckbox.checked;
  }

  public onValidateCoupon(couponCode: string): void {
    console.log(couponCode);
    this.couponLoading = true;

    this.subscriptionService
      .validateCoupon(couponCode)
      .pipe(finalize(() => (this.couponLoading = false)))
      .subscribe(
        (res) => {
          if (res.valid) {
            this._updateTotalPriceCoupon(res.amount);
            // this.couponMessageSuccess =
            this.couponError = '';
            this.displayCouponError = false;
            this.couponCodeValid = true;
          }
        },
        (error) => {
          console.log(error.message.message);
          this.couponError = 'nope';
          this.displayCouponError = true;
        }
      );
  }

  ////////////
  // PRIVATE
  ////////////

  private _updateTotalPriceCoupon(amount: number): void {
    this.totalPrice -= amount;
    this.priceOff += amount;
  }

  private _getTotalPrice(): void {
    // console.log(this.selectedFormules);
    // Calculating the initial total price
    let totalFormules = 0;
    this.selectedFormules.forEach((formule) => {
      let count = 1;
      while (count <= formule.formuleCount) {
        count++;
        totalFormules++;
        this.totalPrice += +formule.price;
      }
    });

    console.log(totalFormules);

    // Deducting 10% for each extra subscription
    // const formuleLength = totalFormules.length;
    if (totalFormules > 1) {
      const percentage = 10 * (totalFormules - 1);
      console.log(percentage);
      console.log(this.totalPrice);
      this.priceOff = (percentage / 100) * this.totalPrice;
      this.totalPrice -= this.priceOff;
    }
  }

  private _initFormuleForm(): void {
    this.formuleForm = this.formBuilder.group({
      formules: this.formBuilder.array([], {
        validators: requireCheckboxesToBeCheckedValidator(),
      }),
    });
  }

  private _updateFormuleForm(formules: Formule[]): void {
    if (!this.formulesArray.length) {
      formules.forEach(() => {
        const formuleItem = this.formBuilder.control(null);
        this.formulesArray.push(formuleItem);
      });
    }
  }

  private _initAccountForm(): FormGroup {
    return this.formBuilder.group({
      email: this.formBuilder.control(null, [
        Validators.required,
        Validators.email,
      ]),
      password: this.formBuilder.control(null, [
        Validators.required,
        Validators.min(6),
      ]),
    });
  }

  private _initSubscriptionForm(): void {
    this.subscriptionForm = this.formBuilder.group({
      adultsForms: this.formBuilder.array([]),
      kidsForms: this.formBuilder.array([]),
      accountCreation: this.formBuilder.group({
        firstName: this.formBuilder.control(null, [Validators.required]),
        lastName: this.formBuilder.control(null, [Validators.required]),
        email: this.formBuilder.control(null, [
          Validators.required,
          Validators.email,
        ]),
        password: this.formBuilder.control(null, [
          Validators.required,
          Validators.min(6),
        ]),
      }),
      termsAndConditions: this.formBuilder.control(
        false,
        Validators.requiredTrue
      ),
    });
  }

  private _initSubscriptionAdultForm(formule: Formule): FormGroup {
    return this.formBuilder.group({
      memberLastName: this.formBuilder.control(null, Validators.required),
      memberFirstName: this.formBuilder.control(null, Validators.required),
      birthdate: this.formBuilder.control(null, Validators.required),
      gender: this.formBuilder.control(null, Validators.required),
      phone: this.formBuilder.control(null, Validators.required),
      renew: this.formBuilder.control(false, Validators.required),
      extraInfo: this.formBuilder.control(null),
      formule: this.formBuilder.group({
        title: this.formBuilder.control(formule.title),
        ageGroup: this.formBuilder.control(formule.ageGroup),
        price: this.formBuilder.control(formule.price),
        location: this.formBuilder.control(formule.location),
        street: this.formBuilder.control(formule.street),
        coupon: this.formBuilder.control(formule.coupon),
      }),
    });
  }

  private _initSubscriptionKidForm(formule: Formule): FormGroup {
    return this.formBuilder.group({
      memberLastName: this.formBuilder.control(null, Validators.required),
      memberFirstName: this.formBuilder.control(null, Validators.required),
      birthdate: this.formBuilder.control(null, Validators.required),
      gender: this.formBuilder.control(null, Validators.required),
      renew: this.formBuilder.control(false, Validators.required),
      coupon: this.formBuilder.control(null, Validators.required),
      extraInfo: this.formBuilder.control(null),
      formule: this.formBuilder.group({
        title: this.formBuilder.control(formule.title),
        ageGroup: this.formBuilder.control(formule.ageGroup),
        price: this.formBuilder.control(formule.price),
        location: this.formBuilder.control(formule.location),
        street: this.formBuilder.control(formule.street),
        coupon: this.formBuilder.control(formule.coupon),
      }),
    });
  }

  private _getFormules(): void {
    this.loading = true;

    this.formules$ = this.formuleService.getFormules().pipe(
      map((res) => {
        return res.map((formule, idx) => {
          formule.index = idx;
          return formule;
        });
      }),
      tap((res) => this._updateFormuleForm(res)),
      tap((res) => (this.formules = res)),
      finalize(() => (this.loading = false))
    );
  }
}
