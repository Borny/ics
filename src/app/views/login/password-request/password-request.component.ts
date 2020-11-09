import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'password-request',
  templateUrl: './password-request.component.html',
  styleUrls: ['../login.component.scss']
})
export class PasswordRequestView implements OnInit {

  public requestResetForm: FormGroup;
  public errorMessage: string;
  public successMessage = false;
  public isLoading = false;
  public isValidForm = true;
  public noUserFound = false;
  public unknowError = false;

  public readonly SUBMIT_BTN_TEXT = 'Envoyer';
  public readonly LOGIN_ROUTE = 'connexion';
  public readonly RELOAD_BTN_TEXT = 'Réessayer';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.requestResetForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  public onSubmit() {
    this.isLoading = true;
    if (!this.requestResetForm.valid) {
      return;
    }
    this.isValidForm = true;
    this.authService.requestPassword(this.requestResetForm.value)
      .subscribe(
        data => {
          this.isLoading = false;
          this.requestResetForm.reset();
          this.successMessage = true;

          // Redirect to login page
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate([this.LOGIN_ROUTE]);
          }, 3000);
        },
        err => {
          this.isLoading = false;
          if (err.error.message) {
            return this.noUserFound = true;
          } else {
            return this.unknowError = true;
          }
        }
      );
  }

  public onReload(): void {
    location.reload();
  }

}
