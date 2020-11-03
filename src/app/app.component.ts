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
  public showSubNav = false;

  public readonly LOGOUT_BTN_TEXT = 'Déconnexion';
  public readonly LOGIN_BTN_TEXT = 'Connexion';
  public readonly LOGO_COLOR = 'white';

  private authListenerSubs: Subscription;

  private readonly SCREEN_SM = '(max-width: 768px)';

  constructor(
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
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

  public onCloseNav(): void {
    this.navToggle.close();
  }

  public onToggleNav(): void {
    this.navToggle.toggle();
  }

  public onNavigateToLogin(): void {
    this.router.navigateByUrl('/connexion');
    if (this.mobileQuery.matches) {
      this.navToggle.toggle();
    }
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
