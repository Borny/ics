import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['../login.component.scss']
})
export class LoginView implements OnInit {

  public isLoading = false;
  public loginFailed = false;
  public heading: string;
  public showLogInForm: boolean;
  public showSignUpForm: boolean;
  public toggleFormText: string;
  public toggleFormBtnText: string;

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
  }

  public onLogin(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    // this.authService.login(form.value);
    this.authService.login();
  }

  public onSignup(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    // this.authService.login(form.value);
    this.authService.signup();
  }

  public onReload(): void {
    location.reload();
  }

  public onToggleForm():void{
    if(this.showLogInForm){
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
}
