import { Inject, NgModule, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule, FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MaterialModule } from '../../../angular-material/angular-material.module';
import { User } from '../../../models/user.model';
import { mimeType } from '../../../validators/mime-type.validator';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss']
})
export class EditProfileDialog implements OnInit {

  public editProfileForm: FormGroup = new FormGroup({});
  public user: User;
  public userId: string;
  public imagePreview: string;
  public isLoading = false;
  public userError = false;
  public imageEdited = false;

  public readonly CONFIRM = 'confirm';
  public readonly CANCEL = 'cancel';

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<EditProfileDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    public dialog: MatDialog,
  ) {
    this.userId = data;
    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this._getUserData();
  }

  public onSubmit(): void {
    if (this.editProfileForm.invalid) {
      return;
    }

    this.user.firstName = this.editProfileForm.get('firstName').value;
    this.user.lastName = this.editProfileForm.get('lastName').value;
    this.user.nickName = this.editProfileForm.get('nickName').value;

    if (this.user.profileImagePath === null || this.imageEdited) {
      this.user.profileImagePath = this.editProfileForm.get('image').value;
    }
  }

  public onImagepicked(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.editProfileForm.patchValue({ image: file });
    this.editProfileForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    this.imageEdited = true;
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    // creating the reader
    // defining what we do when its loaded
    // loading the file reader
  }

  public onCancel(): void {
    this.dialogRef.close({ user: this.user, imagePreview: this.imagePreview, action: this.CANCEL });
  }

  ////////////
  // PRIVATE
  ////////////
  private _getUserData(): void {
    this.authService.getUser(this.userId)
      .subscribe(
        response => {
          this.user = response.user;
          this.imagePreview = this.user.profileImagePath;
          this._initEditProfileForm(response.user);
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
          this.userError = true;
        }
      );
  }

  private _initEditProfileForm(user: User): void {
    this.editProfileForm.addControl('lastName', new FormControl(user.lastName, Validators.required));
    this.editProfileForm.addControl('firstName', new FormControl(user.firstName, Validators.required));
    this.editProfileForm.addControl('nickName', new FormControl(user.nickName, Validators.required));
    this.editProfileForm.addControl(
      'image',
      new FormControl(this.user.profileImagePath, { validators: [Validators.required], asyncValidators: [mimeType] })
    );
  }
}

@NgModule({
  declarations: [EditProfileDialog],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, FormsModule],
  exports: [],
  providers: [],
})
class StateDialogModule { }
