import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginView implements OnInit {

  public isLoading = false;
  public loginFailed = false;
  public loginForm: FormGroup = new FormGroup({});

  public readonly CONNECT_BTN_TEXT = 'Se connecter';
  public readonly RELOAD_BTN_TEXT = 'Réessayer';

  constructor() { }

  ngOnInit(): void {
    this.loginForm.addControl('loginEmail', new FormControl(null, [Validators.required, Validators.email]))
    this.loginForm.addControl('loginPassword', new FormControl(null, [Validators.required, Validators.minLength(6)]))
  }

  public onSubmit(): void {
    this.isLoading = true;
    console.log(this.loginForm.value);
    // this.loginService.adminLogin(this.loginForm.value);
  }

  public onReload(): void {
    location.reload();
  }
}
