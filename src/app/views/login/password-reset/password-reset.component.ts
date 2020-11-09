import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['../login.component.scss']
})
export class PasswordResetView implements OnInit {

  public isLoading = true;

  public resetForm: FormGroup;

  public tokenInvalid = false;
  public passwordResetSuccess = false;
  public passwordResetFailed = false;
  public resetToken: null;
  public doesNotMatch = false;

  public readonly RELOAD_BTN_TEXT = 'Réessayer';
  public readonly SUBMIT_BTN_TEXT = 'Créer';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
    this.isLoading = true;
    this.route.params.subscribe(params => {
      this.resetToken = params.token;
      this._verifyToken();
    });
  }

  ngOnInit() {
    this._initResetForm();
  }

  public onSubmit() {
    this.isLoading = true;
    if (!this.resetForm.valid) {
      return;
    }
    this.authService.newPassword(this.resetForm.value).subscribe(
      data => {
        this.resetForm.reset();
        this.passwordResetSuccess = true;
        this.isLoading = false;
        setTimeout(() => {
          this.passwordResetSuccess = false;
          this.router.navigate(['connexion']);
        }, 3000);
      },
      err => {
        this.isLoading = false;
        this.passwordResetFailed = true;
      }
    );
  }

  public onReload(): void {
    location.reload();
  }

  ////////////
  // PRIVATE
  ////////////
  private _verifyToken() {
    this.authService.validPasswordToken({ resetToken: this.resetToken })
      .subscribe(
        data => {
          this.isLoading = false;
        },
        err => {
          this.isLoading = false;
          this.tokenInvalid = true;
        }
      );
  }

  private _initResetForm(): void {
    this.resetForm = this.fb.group(
      {
        resetToken: [this.resetToken],
        newPassword: ['', [Validators.required, Validators.minLength(6)]]
      }
    );
  }

}
