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
import { finalize, tap } from 'rxjs/operators';

import { SubscriptionService } from '../../services/subscription/subscription.service';
import { AdultFormData } from '../../models/adultFormData.model';
import { KidsFormData } from '../../models/kidsFormData.model';
import { ClassDeals } from '../../models/classDeals.model';
import { SubscriptionType } from '../../models/subscriptionType.enum';
import { requireCheckboxesToBeCheckedValidator } from '../../validators/checkbox';

import { Formule } from 'src/app/models/formule.models';
import { MatDialog } from '@angular/material/dialog';
import { FormuleService } from 'src/app/services/formule/formule.service';

@Component({
  selector: 'subscription',
  templateUrl: 'subscription.component.html',
  styleUrls: ['subscription.component.scss'],
})
export class SubscriptionView implements OnInit {
  public loading = false;
  public formules$: Observable<Formule[]>;
  public formuleForm: FormGroup;
  public subscriptionForm: FormGroup = new FormGroup({});

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

  public onSubmit(): void {
    this.selectedFormules = [];
    this.formuleForm.value.formules.forEach((formuleFormItem, idx) => {
      if (formuleFormItem === true) {
        this.selectedFormules.push(this.formules[idx]);
      }
    });
    console.log('selectedFormules', this.selectedFormules);
  }

  public onToggleChecked(data: {
    checked: boolean;
    formule: Formule;
    formuleIndex: number;
  }): void {
    const { checked, formule, formuleIndex } = data;
    formule.checked = checked;

    // console.log(checked);
    // console.log(formule);

    this.formulesArray.at(formuleIndex).patchValue(checked);

    // this.formuleForm.updateValueAndValidity();
    // this.formulesArray.updateValueAndValidity();

    // console.log(this.formulesArray);
    console.log(this.formuleForm.value);
    // console.log(this.formulesArray.valid);
  }

  ////////////
  // PRIVATE
  ////////////
  // private _hideAllForms(): void {
  //   this.showKidForm = false;
  //   this.showAdultForm = false;
  // }

  private _initFormuleForm(): void {
    this.formuleForm = this.formBuilder.group({
      formules: this.formBuilder.array([], {
        validators: requireCheckboxesToBeCheckedValidator(),
      }),
    });

    // this.formuleForm = new FormGroup({
    //   formules: new FormArray([], requireCheckboxesToBeCheckedValidator()),
    // });

    // console.log('init form', this.formuleForm);
  }

  private _updateFormuleForm(formules: Formule[]): void {
    // this.formuleForm = this.formBuilder.group({
    //   formules: this.formBuilder.array([], Validators.required),
    // }, { validators: requireCheckboxesToBeCheckedValidator() });

    // this.formuleForm

    formules.forEach((formule) => {
      const formuleItem = this.formBuilder.control(null);
      this.formulesArray.push(formuleItem);
      // const formuleItem = this.formBuilder.group({
      //   checked: this.formBuilder.control(null),
      //   formule: this.formBuilder.control(formule)
      // });
      // this.formulesArray.push(formuleItem);
      // this.formulesArray.push(new FormControl(null));
    });

    // console.log('udpate form', this.formuleForm);
  }

  private _getFormules(): void {
    // console.log('get formules');
    this.loading = true;
    this.formules$ = this.formuleService.getFormules().pipe(
      tap((res) => this._updateFormuleForm(res)),
      tap((res) => (this.formules = res)),
      finalize(() => (this.loading = false))
    );
  }
}
