import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import {
  StepperOrientation,
  StepperSelectionEvent,
} from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';

import { AgeGroupEnum } from 'src/app/models/age-group.enum';
import { GenderEnum } from 'src/app/models/gender.enum';
import { PaymentMethodEnum } from 'src/app/models/payment-method.enum';
import { ISPService } from 'src/app/services/subscription/isp.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'isp',
  templateUrl: 'isp.component.html',
  styleUrls: ['isp.component.scss'],
})
export class IspView implements OnInit {
  @ViewChild('creditCardElement') creditCardElement: ElementRef;

  public loading = false;
  public subscriptionLoading = false;
  public checkEmailLoading = false;
  public paymentLoading = false;
  public subscriptionForm: FormGroup = new FormGroup({});
  public subscriptionKidForm: FormGroup = new FormGroup({});
  // public paymentForm: FormGroup = new FormGroup({});
  public genders = Object.values(GenderEnum);
  public ageGroupEnum = AgeGroupEnum;
  public totalPrice: number;
  public subscriptionsData: any;
  public showCardPaymentValidation = false;
  public showOtherPaymentValidation = false;
  public showSubscriptionValidation = false;
  public cardPaymentBtnDisabled = false;

  public stepperOrientation$: Observable<StepperOrientation>;
  public isVertical = 'vertical';

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
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver,
    private ispService: ISPService
  ) {
    this.stepperOrientation$ = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit() {
    this.loading = true;
    this._stepperDirectionUpdate();
    this._getTotalPrice();
  }

  public onCheckEmail(stepper: MatStepper): void {
    this.checkEmailLoading = true;

    this.ispService
      .checkEmail(this.subscriptionForm.value.accountCreation.email)
      .pipe(finalize(() => (this.checkEmailLoading = false)))
      .subscribe(
        (res) => {
          stepper.next();
          this._scrollToTop();
          // console.log(this.subscriptionForm.value);
          setTimeout(() => {
            this._initStripe();
          }, 2000);
        },
        (error) => {
          if (error.error.message === 'User already exists') {
            this.subscriptionForm
              .get('accountCreation')
              .get('email')
              .setErrors({ notUnique: true });

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

    this.cardPaymentBtnDisabled = true;

    const result = await this.stripe.createToken(this.creditCardContainer);

    this.subscriptionsData = {
      formValues: this.subscriptionForm.getRawValue(),
      totalPrice: this.totalPrice,
      token: result.token,
      paymentMethod: PaymentMethodEnum.CARD,
    };

    if (result.error) {
      this.cardErrors = result.error.message;
      this.cardPaymentBtnDisabled = false;
    } else {
      this.paymentLoading = true;
      this.ispService
        .validateSubscriptionCardPayment(this.subscriptionsData)
        .pipe(
          finalize(() => {
            this.paymentLoading = false;
            this.cardPaymentBtnDisabled = false;
          })
        )
        .subscribe(
          (res) => {
            this.showCardPaymentValidation = true;
            this.showSubscriptionValidation = true;
            this._scrollToTop();
            this.subscriptionForm.reset();
          },
          (error) => {
            console.error('sub error', error.error.message);
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
      formValues: this.subscriptionForm.getRawValue(),
      totalPrice: this.totalPrice,
      paymentMethod: PaymentMethodEnum.OTHER,
    };

    this.paymentLoading = true;
    this.ispService
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
          // console.log(res);
          this.subscriptionForm.reset();
        },
        (error) => {
          console.error('sub error', error.error.message);
          this._snackBar.open(`Une erreur est survenue, veuillez réessayer`);
        }
      );
  }

  public onBackToSubscription(stepEvent?: StepperSelectionEvent): void {
    if (stepEvent && stepEvent.selectedIndex === 0) {
      this.showCardPaymentValidation = false;
      this.showOtherPaymentValidation = false;
      this.showSubscriptionValidation = false;
    }
  }

  public onNavigateHome(): void {
    this.router.navigateByUrl('/accueil');
  }

  public onNavigateSignIn(): void {
    this.router.navigateByUrl('/connexion');
  }

  public onBirthdateSelected(event: MatDatepickerInputEvent<Date>): void {
    this.subscriptionForm
      .get('kidsForm')
      .get('birthdate')
      .patchValue(event.value);
  }

  ////////////
  // PRIVATE
  ////////////

  // Calling stripe and creating the card input element
  private _initStripe(): void {
    // Importing the key
    this.stripe = Stripe(
      'pk_test_51Iv7cDBNp46nE7OQLPrY4PmFtM6AoYRFY4Evu88HbrQlP52yu5gJtF66Wjejq1I5inWvY0lJvvcOvhSvArEKyiAg00vVh5wPtf'
      // 'pk_live_51Iv78DInlL2kaZj1snSdVBtKW8YD4LWQU4m2MHONj5S6mRHGg4rTQ2Hq8l6eH2PGI6OeFWzFeGJShTl1XLDV7zc400j47Y0wE9'
    );

    // Creating the element
    const elements = this.stripe.elements({ locale: 'fr' });

    this.creditCardContainer = elements.create('card');
    this.creditCardContainer.mount(this.creditCardElement.nativeElement);

    this.creditCardContainer.addEventListener('change', (callback) => {
      // console.log('callback', callback);

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

  private _getTotalPrice(): void {
    // console.log('_getTotalPrice');
    this.ispService
      .getSubscriptionPrice()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(({ priceObject }) => {
        // console.log(priceObject);
        this.totalPrice = priceObject.price;
        this._initSubscriptionForm();
      });
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
      kidsForm: this.formBuilder.group({
        memberLastName: this.formBuilder.control(null, Validators.required),
        memberFirstName: this.formBuilder.control(null, Validators.required),
        birthdate: [{ value: null, disabled: true }, Validators.required],
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
        subscriptionAmount: this.formBuilder.control(this.totalPrice),
        subscriptionDate: this.formBuilder.control(
          new Date(),
          Validators.required
        ),
      }),
      accountCreation: this.formBuilder.group(
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
    });
  }
}
