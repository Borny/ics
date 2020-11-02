import { MediaMatcher } from '@angular/cdk/layout';
import { Component, ViewChild, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('snav') navToggle;

  public mobileQuery: MediaQueryList;
  public toggleIconName = 'menu';
  public isUserAuthenticated = false;

  public readonly LOGOUT_BTN_TEXT = 'Log out';
  public readonly LOGIN_BTN_TEXT = 'Log in';
  public readonly LOGO_COLOR = 'white';

  private authListenerSubs: Subscription;

  private readonly SCREEN_SM = '(max-width: 768px)';

  constructor(
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher) {
    this.mobileQuery = media.matchMedia(this.SCREEN_SM);
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatus()
      .subscribe(
        isAuthenticated => {
          this.isUserAuthenticated = isAuthenticated;
          console.log(this.isUserAuthenticated);
        });

    this.authService.autoAuthUser();
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  public closeNav(): void {
    this.navToggle.close();
  }

  public toggleNav(): void {
    this.navToggle.toggle();
  }

  public onLogout(): void {
    this.authService.logout();
    if (this.mobileQuery.matches) {
      this.navToggle.toggle();
    }
  }

  private _mobileQueryListener(): void {
    return this.changeDetectorRef.detectChanges();
  }
}
