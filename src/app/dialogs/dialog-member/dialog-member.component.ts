import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule } from '@angular/core';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { MaterialModule } from 'src/app/angular-material/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { SubscriptionAgeMode } from 'src/app/models/SubscriptionAgeMode.enum';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import { AdultSubscription } from 'src/app/models/adultSubscription.model';
import { KidSubscription } from 'src/app/models/kidSubscription.model';
import { GenderEnum } from 'src/app/models/gender.enum';
import { YesNoEnum } from 'src/app/models/yesNoEnum.enum';
import { DialogDeleteConfirm } from '../dialog-delete-confirm/dialog-delete-confirm.component';
import { ISPService } from 'src/app/services/subscription/isp.service';

@Component({
  selector: 'dialog-member',
  templateUrl: './dialog-member.component.html',
  styleUrls: ['./dialog-member.component.scss'],
})
export class DialogMember {
  public member: AdultSubscription | KidSubscription;
  public memberId: string;
  public kidForm: FormGroup = new FormGroup({});
  public adultForm: FormGroup = new FormGroup({});
  public loading = false;
  public adult: AdultSubscription;
  public kid: KidSubscription;
  public subscriptionAgeMode = SubscriptionAgeMode;
  public ageMode: SubscriptionAgeMode;
  public genders = Object.values(GenderEnum);

  public dialogTitle = "Modifier l'adhérent :";

  private readonly _DELETE = 'delete';
  private readonly _CONFIRM = 'confirm';
  private readonly _CANCEL = 'cancel';

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private subscriptionService: SubscriptionService,
    private ispService: ISPService,
    public dialogRef: MatDialogRef<DialogMember>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      memberId: string;
      ageMode: SubscriptionAgeMode;
      ISP?: boolean;
    }
  ) {
    this.loading = true;
    this.ageMode = data.ageMode;
    this.memberId = data.memberId;
    if (data.ageMode === SubscriptionAgeMode.SubscriptionAgeModeAdults) {
      this.subscriptionService
        .getAdult(data.memberId)
        .subscribe((adultData) => {
          this.adult = adultData;
          this._initAdultForm(this.adult);
        });
    } else if (
      data.ageMode === SubscriptionAgeMode.SubscriptionAgeModeKids &&
      data.ISP
    ) {
      this.ispService.getMember(data.memberId).subscribe(
        (kidData) => {
          this.kid = kidData;
          this._initKidForm(this.kid);
        },
        (err) => {
          console.error('could not get the kid', err);
        }
      );
    } else if (data.ageMode === SubscriptionAgeMode.SubscriptionAgeModeKids) {
      this.subscriptionService.getKid(data.memberId).subscribe(
        (kidData) => {
          this.kid = kidData;
          this._initKidForm(this.kid);
        },
        (err) => {
          console.error('could not get the kid', err);
        }
      );
    }
  }

  public onCancel(): void {
    this.dialogRef.close({ action: this._CANCEL });
  }

  public onSubmit(): void {
    if (this.adultForm.invalid || this.kidForm.invalid) {
      return;
    }
    if (this.ageMode === this.subscriptionAgeMode.SubscriptionAgeModeAdults) {
      this.member = this.adultForm.getRawValue();
      this.member._id = this.memberId;
    } else if (
      this.ageMode === this.subscriptionAgeMode.SubscriptionAgeModeKids
    ) {
      this.member = this.kidForm.getRawValue();
      this.member._id = this.memberId;
    }
    this.dialogRef.close({ action: this._CONFIRM, member: this.member });
  }

  public onDeleteMember(): void {
    const dialogRef = this.dialog.open(DialogDeleteConfirm, {
      minHeight: '200px',
      data:
        this.ageMode === this.subscriptionAgeMode.SubscriptionAgeModeAdults
          ? this.adult.memberFirstName
          : this.kid.memberFirstName,
    });
    dialogRef.beforeClosed().subscribe((result) => {
      if (result && result.action === this._CONFIRM) {
        this.loading = true;
        this.dialogRef.close({ action: this._DELETE, memberId: this.memberId });
      }
    });
  }

  ////////////
  // PRIVATE
  ////////////

  private _initKidForm(kidData: KidSubscription): void {
    const gender = kidData.gender === GenderEnum.FEMALE ? 0 : 1;
    const renew = kidData.renew === YesNoEnum.YES ? true : false;
    const imageRights = kidData.imageRights === YesNoEnum.YES ? true : false;
    this.kidForm = this.formBuilder.group({
      memberLastName: this.formBuilder.control(
        kidData.memberLastName,
        Validators.required
      ),
      memberFirstName: this.formBuilder.control(
        kidData.memberFirstName,
        Validators.required
      ),
      birthdate: [
        { value: kidData.birthdate, disabled: true },
        Validators.required,
      ],
      gender: this.formBuilder.control(gender, Validators.required),
      subscriptionDate: this.formBuilder.control(
        {
          value: new Date(kidData.subscriptionDate).toLocaleDateString(),
          disabled: true,
        },
        [Validators.required]
      ),
      renew: this.formBuilder.control(renew, Validators.required),
      guardianLastName: this.formBuilder.control(
        kidData.guardianLastName,
        Validators.required
      ),
      guardianFirstName: this.formBuilder.control(
        kidData.guardianFirstName,
        Validators.required
      ),
      guardianEmail: this.formBuilder.control(kidData.guardianEmail, [
        Validators.required,
        Validators.email,
      ]),
      guardianPhone: this.formBuilder.control(kidData.guardianPhone, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
      ]),
      extraInfo: this.formBuilder.control(kidData.extraInfo),
      imageRights: this.formBuilder.control(imageRights, Validators.required),
      userEmail: this.formBuilder.control(
        {
          value: kidData.userEmail,
          disabled: true,
        },
        [Validators.required]
      ),
    });

    this.loading = false;
  }

  private _initAdultForm(adultData: AdultSubscription): void {
    const gender = adultData.gender === GenderEnum.FEMALE ? 0 : 1;
    const renew = adultData.renew === YesNoEnum.YES ? true : false;
    const imageRights = adultData.imageRights === YesNoEnum.YES ? true : false;

    this.adultForm = this.formBuilder.group({
      memberLastName: this.formBuilder.control(
        adultData.memberLastName,
        Validators.required
      ),
      memberFirstName: this.formBuilder.control(
        adultData.memberFirstName,
        Validators.required
      ),
      birthdate: [
        { value: adultData.birthdate, disabled: true },
        Validators.required,
      ],
      gender: this.formBuilder.control(gender, Validators.required),
      phone: this.formBuilder.control(adultData.phone, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
      ]),
      subscriptionDate: this.formBuilder.control(
        {
          value: new Date(adultData.subscriptionDate).toLocaleDateString(),
          disabled: true,
        },
        [Validators.required]
      ),
      renew: this.formBuilder.control(renew, Validators.required),
      extraInfo: this.formBuilder.control(adultData.extraInfo),
      imageRights: this.formBuilder.control(imageRights, Validators.required),
      couponUse: this.formBuilder.control(adultData.couponCodeValid),
      userEmail: this.formBuilder.control(
        {
          value: adultData.userEmail,
          disabled: true,
        },
        [Validators.required]
      ),
    });

    this.loading = false;
  }
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    FormsModule,
  ],
})
class DialogMemberModule {}
