import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['../login.component.scss']
})
export class AdminLoginView implements OnInit, OnDestroy {

  public isLoading = false;
  public loginFailed = false;

  public adminLoginFailed$: Subscription;

  public readonly CONNECT_BTN_TEXT = 'Se connecter';
  public readonly RELOAD_BTN_TEXT = 'Réessayer';

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.adminLoginFailed$ = this.authService.getAdminLoginFailed()
      .subscribe(
        result => {
          this.isLoading = false;
          this.loginFailed = result;
        }
      );
  }

  ngOnDestroy(): void {
    this.adminLoginFailed$.unsubscribe();
  }

  public onAdminLogin(form: NgForm): void {
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
