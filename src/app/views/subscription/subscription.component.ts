import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, finalize, map, shareReplay, take, tap } from 'rxjs/operators';

import { SubscriptionService } from '../../services/subscription/subscription.service';
import { AdultFormData } from '../../models/adultFormData.model';
import { KidsFormData } from '../../models/kidsFormData.model';
import { ClassDeals } from '../../models/classDeals.model';
import { SubscriptionType } from '../../models/subscriptionType.enum';
import { requireCheckboxesToBeCheckedValidator } from '../../validators/checkbox';

import { Formule } from 'src/app/models/formule.models';
import { MatDialog } from '@angular/material/dialog';
import { FormuleService } from 'src/app/services/formule/formule.service';
import { AgeGroupEnum } from 'src/app/models/age-group.enum';
import { GenderEnum } from 'src/app/models/gender.enum';
import { flatten } from '@angular/compiler';

@Component({
  selector: 'subscription',
  templateUrl: 'subscription.component.html',
  styleUrls: ['subscription.component.scss'],
})
export class SubscriptionView implements OnInit {
  public loading = false;
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

  public formules$: Observable<Formule[]>;

  public totalPrice: number;

  // public showDealOptions = true;
  // public formSentSuccess = false;
  // public formSentFailed = false;
  // public showKidForm: boolean;
  // public showAdultForm: boolean;

  public readonly HOME_BTN_TEXT = 'Accueil';
  public readonly PROGRAM_BTN_TEXT = 'Nos programmes';
  public readonly RELOAD_BTN_TEXT = 'Réessayer';

  public readonly USER = 'user';

  public formules: Formule[] = [];
  public selectedFormules: Formule[] = [];
  // public subscriptionForms: any[] = [
  //   {
  //     title: 'Inscription enfant / ado',
  //     subscriptionType: SubscriptionType.SubscriptionFirst,
  //   },
  //   {
  //     title: 'Inscription  Adulte',
  //     subscriptionType: SubscriptionType.SubscriptionAdult,
  //   },
  // ];

  // public classDeals: ClassDeals[] = [
  //   {
  //     title: '1ère inscription',
  //     option: 'Inscription enfant / ado',
  //     description:
  //       'enfants et adolescents : ateliers, passage de corde, uniforme (t-shirt/pantalon)',
  //     price: 290,
  //     subscriptionType: SubscriptionType.SubscriptionFirst,
  //   },
  //   {
  //     title: 'Inscription adultes : ',
  //     option: 'Inscription Adulte',
  //     description: 'ateliers, festival mai 2021',
  //     price: 320,
  //     subscriptionType: SubscriptionType.SubscriptionAdult,
  //   },
  // ];

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
    this._getTotalPrice();
  }

  // public addSubscription(event: Event): void {}

  // public subscriptionFormsOptionHandler(event: { value: ClassDeals }): void {
  //   console.log(event);
  //   switch (event.value.subscriptionType) {
  //     case 0:
  //       this.showKidForm = true;
  //       this.showAdultForm = false;
  //       break;
  //     case 2:
  //       this.showKidForm = false;
  //       this.showAdultForm = true;
  //       break;
  //   }
  // }

  // public sendFirstForm(formData: KidsFormData): void {
  //   this.loading = true;
  //   this.showDealOptions = false;
  //   this._hideAllForms();
  //   console.log(formData);
  //   this.subscriptionService.sendKidsForm(formData).subscribe(
  //     (response) => {
  //       console.log(response);
  //       this.loading = false;
  //       this.formSentSuccess = true;
  //     },
  //     (error) => {
  //       console.log('send form error :', error);
  //       this.loading = false;
  //       this.formSentFailed = true;
  //     }
  //   );
  // }

  // public sendAdultForm(data: AdultFormData): void {
  //   this.loading = true;
  //   this.showDealOptions = false;
  //   this._hideAllForms();
  //   this.subscriptionService.sendAdultForm(data).subscribe(
  //     (response) => {
  //       console.log('adult form response :', response);
  //       this.loading = false;
  //       this.formSentSuccess = true;
  //     },
  //     (error) => {
  //       console.log('adult form error :', error);
  //       this.loading = false;
  //       this.formSentFailed = true;
  //     }
  //   );
  // }

  // // NAVIGATION

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
          this.formules[idx];
          // console.log(formuleFormItem);
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

    // Initializing the sub form with adultsForms and kidsForms
    this.subscriptionForm = this.formBuilder.group({
      adultsForms: this.formBuilder.array([]),
      kidsForms: this.formBuilder.array([]),
    });

    // Populating the adults form array if any adult formule is selected
    if (adultFormules.length) {
      adultFormules.forEach((formule) => {
        // this._initSubscriptionAdultForm(formule);
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
      // console.log('kids form');

      // this._initSubscriptionKidForm();

      kidsFormules.forEach((formule) => {
        let count = 1;
        while (count <= formule.formuleCount) {
          console.log(count, formule);
          count++;
          this.kidsFormsArray.push(this._initSubscriptionKidForm(formule));
        }
      });
      this.showKidSubscriptionForm = true;

      console.log(this.kidsFormsArray);
    }

    this.showSubscriptionForm = true;
    // console.log('submit selectedFormules', this.selectedFormules);
    // console.log('formules adults/kids', adultFormules, kidsFormules);
  }

  public onSubmitSubscriptionForm(): void {
    console.log('submit sub form');
  }

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

    console.log('formules', this.formules);
  }

  public onPreviousFormules(): void {
    this.subscriptionForm.reset();
  }

  ////////////
  // PRIVATE
  ////////////

  private _getTotalPrice(): void {
    this.totalPrice = 450;
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

  private _initSubscriptionAdultForm(formule: Formule): FormGroup {
    // this.subscriptionAdultForm = this.formBuilder.group({
    return this.formBuilder.group({
      memberLastName: this.formBuilder.control(null, Validators.required),
      memberFirstName: this.formBuilder.control(null, Validators.required),
      birthdate: this.formBuilder.control(null, Validators.required),
      gender: this.formBuilder.control(null, Validators.required),
      phone: this.formBuilder.control(null, Validators.required),
      renew: this.formBuilder.control(null, Validators.required),
      email: this.formBuilder.control(null, Validators.required),
      password: this.formBuilder.control(null, Validators.required),
      extraInfo: this.formBuilder.control(null, Validators.required),
      formule: this.formBuilder.group({
        title: this.formBuilder.control(formule.title),
        ageGroup: this.formBuilder.control(formule.ageGroup),
        price: this.formBuilder.control(formule.price),
        location: this.formBuilder.control(formule.location),
        street: this.formBuilder.control(formule.street),
        coupon: this.formBuilder.control(formule.coupon),
      }),
    });

    // this.showSubscriptionForm = true;
  }

  private _initSubscriptionKidForm(formule: Formule): FormGroup {
    console.log('formule', formule);
    return this.formBuilder.group({
      memberLastName: this.formBuilder.control(null, Validators.required),
      memberFirstName: this.formBuilder.control(null, Validators.required),
      birthdate: this.formBuilder.control(null, Validators.required),
      gender: this.formBuilder.control(null, Validators.required),
      renew: this.formBuilder.control(null, Validators.required),
      coupon: this.formBuilder.control(null, Validators.required),
      extraInfo: this.formBuilder.control(null, Validators.required),
      formule: this.formBuilder.group({
        title: this.formBuilder.control(formule.title),
        ageGroup: this.formBuilder.control(formule.ageGroup),
        price: this.formBuilder.control(formule.price),
        location: this.formBuilder.control(formule.location),
        street: this.formBuilder.control(formule.street),
        coupon: this.formBuilder.control(formule.coupon),
      }),
    });

    // this.showSubscriptionForm = true;
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
      tap((res) => {
        // console.log(res);
        this.formules = res;
      }),
      finalize(() => (this.loading = false))
    );
  }
}
