import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

import { SubscriptionService } from '../../services/subscription/subscription.service';
import { requireCheckboxesToBeCheckedValidator } from '../../validators/checkbox';

import { Formule } from 'src/app/models/formule.models';
import { FormuleService } from 'src/app/services/formule/formule.service';
import { AgeGroupEnum } from 'src/app/models/age-group.enum';
import { GenderEnum } from 'src/app/models/gender.enum';
import { DialogTerms } from 'src/app/dialogs/dialog-terms/dialog-terms.component';
import { MatCheckboxChange } from '@angular/material/checkbox';
import {
  StepperOrientation,
  StepperSelectionEvent,
} from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { PaymentMethodEnum } from 'src/app/models/payment-method.enum';

@Component({
  selector: 'subscription',
  templateUrl: 'subscription.component.html',
  styleUrls: ['subscription.component.scss'],
})
export class SubscriptionView implements OnInit {
  @ViewChild('creditCardElement') creditCardElement: ElementRef;

  public loading = false;
  public couponLoading = false;
  public subscriptionLoading = false;
  public checkEmailLoading = false;
  public paymentLoading = false;
  public formuleForm: FormGroup;
  public subscriptionForm: FormGroup = new FormGroup({});
  public subscriptionAdultForm: FormGroup = new FormGroup({});
  public subscriptionKidForm: FormGroup = new FormGroup({});
  // public paymentForm: FormGroup = new FormGroup({});
  public showSubscriptionForm = false;
  public showAdultSubscriptionForm = false;
  public showKidSubscriptionForm = false;
  public genders = Object.values(GenderEnum);
  public ageGroupEnum = AgeGroupEnum;
  public totalPrice: number = 0;
  public initialTotalPrice: number = 0;
  public updatedTotalPrice: number = 0;
  public priceOff: number = 0;
  public priceOffCoupon: number = 0;
  public displayCouponInput: boolean;
  public formules: Formule[] = [];
  public selectedFormules: Formule[] = [];
  public couponError: string;
  public displayCouponError = false;
  public couponCodeValid = false;
  public totalFormules = 0;
  public multipleSubscriptionDiscount = false;
  public couponDiscount = false;
  public subscriptionsData: any;
  public showCardPaymentValidation = false;
  public showOtherPaymentValidation = false;
  public showSubscriptionValidation = false;

  public stepperOrientation$: Observable<StepperOrientation>;
  public isVertical = 'vertical';

  public formules$: Observable<Formule[]>;

  public readonly HOME_BTN_TEXT = 'Accueil';
  public readonly PROGRAM_BTN_TEXT = 'Nos programmes';
  public readonly RELOAD_BTN_TEXT = 'Réessayer';
  public readonly USER = 'user';
  public readonly PAY_BUTTON_TEXT = 'Régler';

  // STRIPE
  public isCardValid = false;
  public cardErrors: string;
  private stripe: any; // : stripe.Stripe;
  private creditCardContainer: any;
  // Card number
  private readonly FRENCH_CARD_NUMBER = 4000002500000003;
  private readonly DECLINED_PAYMENT_CARD_NUMBER = 4000000000009995;

  @HostListener('window:resize') onWindowResize() {
    this.isVertical = window.innerWidth <= 768 ? 'vertical' : 'horizontal';
  }

  constructor(
    private subscriptionService: SubscriptionService,
    private router: Router,
    public dialog: MatDialog,
    private formuleService: FormuleService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation$ = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit() {
    this._getFormules();
    this._initFormuleForm();
    this._stepperDirectionUpdate();
  }

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
    this._scrollToTop();
  }

  public onCheckEmail(stepper: MatStepper): void {
    this.checkEmailLoading = true;

    console.log(this.subscriptionForm.value);

    this.subscriptionService
      .checkEmail(this.subscriptionForm.value.accountCreation.email)
      .pipe(finalize(() => (this.checkEmailLoading = false)))
      .subscribe(
        (res) => {
          stepper.next();
          this._scrollToTop();
          setTimeout(() => {
            this._initStripe();
          }, 2000);
        },
        (error) => {
          console.log('sub error', error.error.message);
          if (error.error.message === 'User already exists') {
            // TODO: add error on email input

            this._snackBar.open(
              `L'adresse email existe déjà. Veuillez la modifier`
            );
          } else {
            this._snackBar.open(`Une erreur est survenue, veuillez réessayer`);
          }
        }
      );
  }

  // PAYMENT
  public async onCardPayment(): Promise<void> {
    if (this.subscriptionForm.invalid) {
      return;
    }

    const result = await this.stripe.createToken(this.creditCardContainer);

    this.subscriptionsData = {
      formValues: this.subscriptionForm.value,
      totalPrice: this.totalPrice,
      token: result.token,
      paymentMethod: PaymentMethodEnum.CARD,
    };
    // console.log([this.subscriptionsData, this.totalPrice]);

    if (result.error) {
      this.cardErrors = result.error.message;
    } else {
      this.paymentLoading = true;
      this.subscriptionService
        .validateSubscriptionCardPayment(this.subscriptionsData)
        .pipe(
          finalize(() => {
            this.paymentLoading = false;
          })
        )
        .subscribe(
          (res) => {
            this.showCardPaymentValidation = true;
            this.showSubscriptionValidation = true;
            this._scrollToTop();
            this.subscriptionForm.reset();
            this.formuleForm.reset();
          },
          (error) => {
            console.log('sub error', error.error.message);
            this._snackBar.open(`Une erreur est survenue, veuillez réessayer`);
            setTimeout(() => {
              this._initStripe();
            }, 2000);
          }
        );
    }
  }

  public onOtherPayment(): void {
    if (this.subscriptionForm.invalid) {
      return;
    }

    this.subscriptionsData = {
      formValues: this.subscriptionForm.value,
      totalPrice: this.totalPrice,
      paymentMethod: PaymentMethodEnum.OTHER,
    };

    this.paymentLoading = true;
    this.subscriptionService
      .validateSubscriptionOtherPayment(this.subscriptionsData)
      .pipe(
        finalize(() => {
          this.paymentLoading = false;
        })
      )
      .subscribe(
        (res) => {
          this.showOtherPaymentValidation = true;
          this.showSubscriptionValidation = true;
          this._scrollToTop();
          this.subscriptionForm.reset();
          this.formuleForm.reset();
        },
        (error) => {
          console.log('sub error', error.error.message);
          this._snackBar.open(`Une erreur est survenue, veuillez réessayer`);
        }
      );
  }

  // SUBSCRIPTION FORM
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
  }

  public onBackToFormules(stepEvent?: StepperSelectionEvent): void {
    if (stepEvent && stepEvent.selectedIndex === 0) {
      this.subscriptionForm.reset();
      this.subscriptionForm.clearValidators();
      this.formuleForm.reset();
      this.formuleForm.clearValidators();
      this.selectedFormules = [];
      this.totalPrice = 0;
      this.initialTotalPrice = 0;
      this.updatedTotalPrice = 0;
      this.displayCouponInput = false;
      this.displayCouponError = false;
      this.couponCodeValid = false;
      this.priceOff = 0;
      this.priceOffCoupon = 0;
      this.couponLoading = false;
      this.multipleSubscriptionDiscount = false;
      this.couponDiscount = false;
      this.totalFormules = 0;
      this.showCardPaymentValidation = false;
      this.showOtherPaymentValidation = false;
      this.showSubscriptionValidation = false;

      this._getFormules();
    }
  }

  public onOpenTerms(): void {
    const dialogRef = this.dialog.open(DialogTerms, {
      minWidth: '320px',
      maxWidth: '600px',
      width: '100%',
    });
    dialogRef.beforeClosed().subscribe();
  }

  public onToggleCoupon(
    couponCheckbox: MatCheckboxChange,
    subscription: any
  ): void {
    if (subscription.value.formule.hasCoupon) {
      subscription.showCoupon = couponCheckbox.checked;
    }
  }

  public onValidateCoupon(event: Event, subscription): void {
    // this.couponLoading = true;
    // this.couponError = '';
    // this.displayCouponError = false;

    // console.log(subscription);

    this.subscriptionService
      .validateCoupon(
        subscription.value.couponInput.trim(),
        subscription.value.formule.id
      )
      .pipe(finalize(() => (this.couponLoading = false)))
      .subscribe(
        (res) => {
          if (res.valid) {
            // console.log('res', res);
            this._updateTotalPriceWithCoupon(res.couponValue);
            subscription.get('couponCodeValid').patchValue(true);
            subscription.get('couponValue').patchValue(res.couponValue);
            const updatedFormulePrice =
              subscription.get('formule').get('price').value - res.couponValue;
            subscription
              .get('formule')
              .get('price')
              .patchValue(updatedFormulePrice);
            subscription
              .get('subscriptionAmount')
              .patchValue(updatedFormulePrice);
          } else {
            subscription.get('couponCodeValid').patchValue(false);
          }
        },
        (error) => {
          // console.log('coupon check error', error.message.message);
          // this.couponError = 'nope';
          // this.displayCouponError = true;
        }
      );
  }

  public onNavigateHome(): void {
    this.router.navigateByUrl('/accueil');
  }

  public onNavigateSignIn(): void {
    this.router.navigateByUrl('/connexion');
  }

  ////////////
  // PRIVATE
  ////////////
  // Calling stripe and creating the card input element
  private _initStripe(): void {
    // Importing the key
    // 'pk_test_51Iv7cDBNp46nE7OQLPrY4PmFtM6AoYRFY4Evu88HbrQlP52yu5gJtF66Wjejq1I5inWvY0lJvvcOvhSvArEKyiAg00vVh5wPtf'
    this.stripe = Stripe(
      'pk_live_51Iv78DInlL2kaZj1snSdVBtKW8YD4LWQU4m2MHONj5S6mRHGg4rTQ2Hq8l6eH2PGI6OeFWzFeGJShTl1XLDV7zc400j47Y0wE9'
    );

    // Creating the element
    const elements = this.stripe.elements({ locale: 'fr' });

    this.creditCardContainer = elements.create('card');
    this.creditCardContainer.mount(this.creditCardElement.nativeElement);

    this.creditCardContainer.addEventListener('change', (callback) => {
      console.log('callback', callback);

      this.cardErrors = callback.error && callback.error.message;
      this.isCardValid = callback.complete;
    });
  }

  private _stepperDirectionUpdate(): void {
    this.isVertical = window.innerWidth <= 768 ? 'vertical' : 'horizontal';
  }

  private _scrollToTop(): void {
    // TODO: improve this
    const sidenavContent = document.getElementsByTagName('mat-sidenav-content');
    sidenavContent[0].scrollTo(0, 0);
  }

  private _updateTotalPriceWithCoupon(amount: number): void {
    this.updatedTotalPrice -= amount;
    this.totalPrice = this.updatedTotalPrice;
    this.priceOffCoupon += amount;
    this.priceOff = this.priceOffCoupon;
    this.couponDiscount = true;

    if (this.totalFormules > 1) {
      const PERCENTAGE = 10;
      let priceOff;

      priceOff = (PERCENTAGE / 100) * this.totalPrice;

      this.priceOff += priceOff;
      this.totalPrice -= priceOff;
    }
  }

  private _getTotalPrice(): void {
    // Calculating the initial total price
    this.selectedFormules.forEach((formule) => {
      let count = 1;
      while (count <= formule.formuleCount) {
        count++;
        this.totalFormules++;
        this.initialTotalPrice = +formule.price;
        this.updatedTotalPrice += +formule.price;
        this.totalPrice += +formule.price;
      }
    });

    // console.log('initialTotalPrice :', this.initialTotalPrice);

    // Deducting 10% on the total price if more than one formule
    if (this.totalFormules > 1) {
      const PERCENTAGE = 10;
      // console.log(percentage);
      // console.log(this.totalPrice);
      this.priceOff = (PERCENTAGE / 100) * this.totalPrice;
      this.totalPrice -= this.priceOff;
      this.multipleSubscriptionDiscount = true;
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

  private _confirmPasswordValidator(
    controlName: string,
    matchingControlName: string
  ) {
    return (formGroup: FormGroup) => {
      let control = formGroup.controls[controlName];
      let matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmPasswordValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  // FORMS
  private _initSubscriptionForm(): void {
    this.subscriptionForm = this.formBuilder.group({
      adultsForms: this.formBuilder.array([]),
      kidsForms: this.formBuilder.array([]),
      accountCreation: this.formBuilder.group(
        // {
        //   firstName: this.formBuilder.control(null),
        //   lastName: this.formBuilder.control(null),
        //   email: this.formBuilder.control(null, [
        //     Validators.required,
        //     Validators.email,
        //   ]),
        //   password: this.formBuilder.control(null),
        //   passwordConfirmation: this.formBuilder.control(null),
        //   signUpDate: this.formBuilder.control(new Date()),
        // }
        {
          firstName: this.formBuilder.control(null, [Validators.required]),
          lastName: this.formBuilder.control(null, [Validators.required]),
          email: this.formBuilder.control(null, [
            Validators.required,
            Validators.email,
          ]),
          password: this.formBuilder.control(null, [
            Validators.required,
            Validators.minLength(6),
          ]),
          passwordConfirmation: this.formBuilder.control(null, [
            Validators.required,
            Validators.minLength(6),
          ]),
          signUpDate: this.formBuilder.control(new Date(), Validators.required),
        },
        {
          validator: this._confirmPasswordValidator(
            'password',
            'passwordConfirmation'
          ),
        }
      ),
      // termsAndConditions: this.formBuilder.control(false),
      termsAndConditions: this.formBuilder.control(
        false,
        Validators.requiredTrue
      ),
    });
  }

  private _initSubscriptionAdultForm(formule: Formule): FormGroup {
    return this.formBuilder.group({
      // memberLastName: this.formBuilder.control(null),
      // memberFirstName: this.formBuilder.control(null),
      // birthdate: this.formBuilder.control(null),
      // gender: this.formBuilder.control(null),
      // phone: this.formBuilder.control(null),
      // renew: this.formBuilder.control(false),
      // extraInfo: this.formBuilder.control(null),
      // imageRights: this.formBuilder.control(false),
      // couponInput: this.formBuilder.control(''),
      // couponCodeValid: this.formBuilder.control(null),
      // couponValue: this.formBuilder.control(null),
      // subscriptionAmount: this.formBuilder.control(formule.price),
      // subscriptionDate: this.formBuilder.control(new Date()),
      // formule: this.formBuilder.group({
      //   id: this.formBuilder.control(formule._id),
      //   title: this.formBuilder.control(formule.title),
      //   ageGroup: this.formBuilder.control(formule.ageGroup),
      //   price: this.formBuilder.control(formule.price),
      //   location: this.formBuilder.control(formule.location),
      //   street: this.formBuilder.control(formule.street),
      //   hasCoupon: this.formBuilder.control(formule.hasCoupon),
      // }),
      memberLastName: this.formBuilder.control(null, Validators.required),
      memberFirstName: this.formBuilder.control(null, Validators.required),
      birthdate: this.formBuilder.control(null, Validators.required),
      gender: this.formBuilder.control(null, Validators.required),
      phone: this.formBuilder.control(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
      ]),
      renew: this.formBuilder.control(false, Validators.required),
      extraInfo: this.formBuilder.control(null),
      imageRights: this.formBuilder.control(false, Validators.required),
      couponInput: this.formBuilder.control(''),
      couponCodeValid: this.formBuilder.control(null),
      couponValue: this.formBuilder.control(null),
      subscriptionAmount: this.formBuilder.control(formule.price),
      subscriptionDate: this.formBuilder.control(
        new Date(),
        Validators.required
      ),
      formule: this.formBuilder.group({
        id: this.formBuilder.control(formule._id),
        title: this.formBuilder.control(formule.title),
        ageGroup: this.formBuilder.control(formule.ageGroup),
        price: this.formBuilder.control(formule.price),
        location: this.formBuilder.control(formule.location),
        street: this.formBuilder.control(formule.street),
        hasCoupon: this.formBuilder.control(formule.hasCoupon),
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
      guardianLastName: this.formBuilder.control(null, Validators.required),
      guardianFirstName: this.formBuilder.control(null, Validators.required),
      guardianEmail: this.formBuilder.control(null, [
        Validators.required,
        Validators.email,
      ]),
      guardianPhone: this.formBuilder.control(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
      ]),
      extraInfo: this.formBuilder.control(null),
      imageRights: this.formBuilder.control(false, Validators.required),
      couponInput: this.formBuilder.control(''),
      couponCodeValid: this.formBuilder.control(null),
      couponValue: this.formBuilder.control(null),
      subscriptionAmount: this.formBuilder.control(formule.price),
      subscriptionDate: this.formBuilder.control(
        new Date(),
        Validators.required
      ),
      formule: this.formBuilder.group({
        id: this.formBuilder.control(formule._id),
        title: this.formBuilder.control(formule.title),
        ageGroup: this.formBuilder.control(formule.ageGroup),
        kidAge: this.formBuilder.control(formule.kidAge),
        price: this.formBuilder.control(formule.price),
        location: this.formBuilder.control(formule.location),
        street: this.formBuilder.control(formule.street),
        hasCoupon: this.formBuilder.control(formule.hasCoupon),
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

  // PAYMENT
}
