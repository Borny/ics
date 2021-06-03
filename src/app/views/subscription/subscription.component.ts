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
import { filter, finalize, map, tap } from 'rxjs/operators';

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

@Component({
  selector: 'subscription',
  templateUrl: 'subscription.component.html',
  styleUrls: ['subscription.component.scss'],
})
export class SubscriptionView implements OnInit {
  public loading = false;
  public formuleForm: FormGroup;
  public subscriptionForm: FormGroup = new FormGroup({});
  public paymentForm: FormGroup = new FormGroup({});
  public showSubscriptionForm = false;

  public genders = Object.values(GenderEnum);

  public formules$: Observable<Formule[]>;

  public ageGroupEnum = AgeGroupEnum;

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

  public onSubmitFormuleForm(): void {
    this.selectedFormules = [];
    this.formuleForm.value.formules.forEach((formuleFormItem, idx) => {
      if (formuleFormItem === true) {
        this.selectedFormules.push(this.formules[idx]);
      }
    });

    this._initSubscriptionForm();

    // console.log('selectedFormules', this.selectedFormules);
  }

  public onSubmitSubscriptionForm(): void {
    console.log('submit sub form');
  }

  public onToggleChecked(data: { checked: boolean; formule: Formule }): void {
    const { checked, formule } = data;
    formule.checked = checked;
    const idx = this.formules.indexOf(formule);
    this.formulesArray.at(idx).patchValue(checked);
  }

  ////////////
  // PRIVATE
  ////////////

  private _initFormuleForm(): void {
    this.formuleForm = this.formBuilder.group({
      formules: this.formBuilder.array([], {
        validators: requireCheckboxesToBeCheckedValidator(),
      }),
    });
  }

  private _updateFormuleForm(formules: Formule[]): void {
    formules.forEach(() => {
      const formuleItem = this.formBuilder.control(null);
      this.formulesArray.push(formuleItem);
    });
  }

  private _initSubscriptionForm(): void {
    this.subscriptionForm = this.formBuilder.group({
      memberLastName: this.formBuilder.control(null, Validators.required),
      memberFirstName: this.formBuilder.control(null, Validators.required),
      birthdate: this.formBuilder.control(null, Validators.required),
      gender: this.formBuilder.control(null, Validators.required),
      email: this.formBuilder.control(null, Validators.required),
      phone: this.formBuilder.control(null, Validators.required),
      extraInfo: this.formBuilder.control(null, Validators.required),
    });

    this.showSubscriptionForm = true;
  }

  private _getFormules(): void {
    this.loading = true;

    this.formules$ = this.formuleService.getFormules().pipe(
      tap((res) => this._updateFormuleForm(res)),
      tap((res) => (this.formules = res)),
      // map((res) => res.filter((formule) => formule.ageGroup === 'Enfants')),
      finalize(() => (this.loading = false))
    );
  }
}
