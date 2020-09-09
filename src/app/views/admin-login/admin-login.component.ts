import { Component, OnInit, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginView {

  public isLoading = false;
  public loginFailed = false;

  public readonly CONNECT_BTN_TEXT = 'Se connecter';
  public readonly RELOAD_BTN_TEXT = 'Réessayer';

  constructor(
    private authService: AuthService,
  ) { }

  public onLogin(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.adminLogin(form.value);
  }

  public onReload(): void {
    location.reload();
  }
}
