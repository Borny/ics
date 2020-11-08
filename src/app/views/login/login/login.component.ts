import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['../login.component.scss']
})
export class LoginView implements OnInit, OnDestroy {

  public isLoading = false;
  public loginFailed = false;
  public noUserFound = false;
  public wrongPassword = false;
  public loginFailedMessage: string;
  public isUserCreated = false;
  public userAlreadyExists = false;
  public heading: string;
  public showLogInForm: boolean;
  public showSignUpForm: boolean;
  public toggleFormText: string;
  public toggleFormBtnText: string;

  public loginFailed$: Subscription;

  public readonly CONNECT_BTN_TEXT = 'Se connecter';
  public readonly SIGNUP_BTN_TEXT = `S'inscrire`;
  public readonly RELOAD_BTN_TEXT = 'Réessayer';
  public readonly HEADING_LOGIN = 'Se connecter';
  public readonly HEADING_SIGNUP = `Créer un compte`;
  public readonly LOGIN_FORM_TEXT = `Déjà membre ?`;
  public readonly SIGNUP_FORM_TEXT = `Pas encore de compte ?`;
  public readonly LOGIN_FORM_BTN_TEXT = `Se connecter`;
  public readonly SIGNUP_FORM_BTN_TEXT = `S'inscrire`;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.heading = this.HEADING_LOGIN;
    this.showLogInForm = true;
    this.toggleFormText = this.SIGNUP_FORM_TEXT;
    this.toggleFormBtnText = this.SIGNUP_FORM_BTN_TEXT;
    this._loginFailedListener();
  }

  ngOnDestroy(): void {
    this.loginFailed$.unsubscribe();
  }

  public onLogin(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value);
  }

  public onSignup(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.signup(form.value)
      .subscribe(
        result => {
          console.log('sign up result:', result);
          this.isLoading = false;
          this.onToggleForm();
          this.isUserCreated = true;
        },
        error => {
          this.isLoading = false;
          error.error.message === 'User already exists'
            ?
            this.userAlreadyExists = true
            :
            this.loginFailed = true;
          console.log('sign up error:', error);
        });
  }

  public onReload(): void {
    location.reload();
  }

  public onToggleForm(): void {
    if (this.showLogInForm) {
      this.heading = this.HEADING_SIGNUP;
      this.toggleFormText = this.LOGIN_FORM_TEXT;
      this.toggleFormBtnText = this.LOGIN_FORM_BTN_TEXT;
    } else {
      this.heading = this.HEADING_LOGIN;
      this.toggleFormText = this.SIGNUP_FORM_TEXT;
      this.toggleFormBtnText = this.SIGNUP_FORM_BTN_TEXT;
    }
    this.showLogInForm = !this.showLogInForm;
    this.showSignUpForm = !this.showSignUpForm;
  }
  ////////////
  // PRIVATE
  ////////////
  private _loginFailedListener(): void {
    this.loginFailed$ = this.authService.getUserLoginFailed()
      .subscribe(
        result => {
          this.noUserFound = false;
          this.wrongPassword = false;
          this.isLoading = false;
          this.loginFailed = result.failed;
          this.loginFailedMessage = result.message;
          if (result.message === 'No user found') {
            this.noUserFound = true;
          }
          if (result.message === 'Wrong password') {
            this.wrongPassword = true;
          }
        }
      );
  }
}
