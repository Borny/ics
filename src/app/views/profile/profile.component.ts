import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth/auth.service';
import { EditProfileDialog } from './edit-profile-dialog/edit-profile-dialog.component';
import { finalize } from 'rxjs/operators';
import { PaymentMethodEnum } from 'src/app/models/payment-method.enum';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import { DialogFormuleDetails } from 'src/app/dialogs/dialog-formule-details/dialog-formule-details.component';
import { FormuleService } from 'src/app/services/formule/formule.service';
import { Formule } from 'src/app/models/formule.models';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileView implements OnInit {
  @ViewChild('creditCardElement') creditCardElement: ElementRef;

  public user: User;
  public userId: string;
  public isLoading = false;
  public userError = false;
  public displayInfoContainer = true;
  public paymentLoading = false;
  public showCardPaymentValidation = false;

  // STRIPE
  public isCardValid = false;
  public cardErrors: string;
  private stripe: any; // : stripe.Stripe;
  private creditCardContainer: any;
  // Card number
  private readonly FRENCH_CARD_NUMBER = 4000002500000003;
  private readonly DECLINED_PAYMENT_CARD_NUMBER = 4000000000009995;

  public readonly CONFIRM = 'confirm';
  public readonly CANCEL = 'cancel';
  public readonly PAY_BUTTON_TEXT = 'Régler';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private subscriptionService: SubscriptionService,
    private _snackBar: MatSnackBar,
    private formuleService: FormuleService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._getUser();
  }

  // PAYMENT
  public async onCardPayment(): Promise<void> {
    // if (this.subscriptionForm.invalid) {
    //   return;
    // }
    this.paymentLoading = true;
    const result = await this.stripe.createToken(this.creditCardContainer);
    const paymentData = {
      user: this.user,
      token: result.token,
      paymentMethod: PaymentMethodEnum.CARD,
    };
    if (result.error) {
      this.paymentLoading = false;
      this.cardErrors = result.error.message;
    } else {
      console.log('payment validated');
      this.subscriptionService
        .makeCardPayment(paymentData)
        .pipe(
          finalize(() => {
            this.paymentLoading = false;
          })
        )
        .subscribe(
          (res) => {
            console.log(res);
            this.showCardPaymentValidation = true;
            // this.user.paymentMade = true;
            // this._snackBar.open(`Le paiement a bien été effectué.`);
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

  public onToggle(event: MatButtonToggleChange): void {
    console.log(event);
    this.displayInfoContainer = event.value === 'info';
    if (!this.displayInfoContainer && !this.user.paymentMade) {
      setTimeout(() => {
        this._initStripe();
      }, 500);
    }
  }

  public onDisplayDetails(formuleId: string): void {
    console.log(formuleId);
    this.formuleService
      .getFormuleUserMode(formuleId)
      .subscribe((formule: Formule) => {
        console.log(formule);
        const dialogRef = this.dialog.open(DialogFormuleDetails, {
          minWidth: '320px',
          data: formule,
        });
        dialogRef.beforeClosed().subscribe();
      });
  }

  public onOpenEditDialog(user: User): void {
    const userId = user._id;
    const dialogRef = this.dialog.open(EditProfileDialog, {
      minWidth: '300px',
      data: userId,
    });
    dialogRef.beforeClosed().subscribe((result) => {
      this.user = result.user;
      this.isLoading = true;
      if (result.action === this.CONFIRM) {
        this.authService
          .updateUser({
            _id: this.userId,
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            // this.user.nickName,
            // this.user.profileImagePath
          })
          .subscribe(
            (response) => {
              this.user.profileImagePath = result.imagePreview;
              this.authService.userDataListener$.next(this.user);
              this.isLoading = false;
            },
            (err) => {
              this.isLoading = false;
            }
          );
      } else {
        this.isLoading = false;
      }
    });
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

  private _getUser(): void {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      this.userId = params.userId;
      this.authService.getUser(this.userId).subscribe(
        (response) => {
          this.user = response.user;
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
          this.userError = true;
          this.isLoading = false;
        }
      );
    });
  }
}
