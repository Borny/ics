import { MediaMatcher } from '@angular/cdk/layout';
import {
  Component,
  ViewChild,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { fadeInRouteTrigger } from './animations/route-animations';

import { User } from './models/user.model';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInRouteTrigger],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('snav') navToggle: any;

  public mobileQuery: MediaQueryList;
  public toggleIconName = 'menu';
  public isUserAuthenticated = false;
  public isAdminUserAuthenticated = false;
  public showSubNav = false;
  public user: User;
  public userId: string;

  public readonly LOGOUT_BTN_TEXT = 'Déconnexion';
  public readonly LOGIN_BTN_TEXT = 'Connexion';
  public readonly LOGO_COLOR = 'white';

  private userDataListener$: Subscription;
  private authListenerSubs$: Subscription;
  private authAdminListenerSubs$: Subscription;

  private readonly SCREEN_SM = '(max-width: 768px)';

  constructor(
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia(this.SCREEN_SM);
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    // this._getUserAuthenticationStatus();
    this._getAdminUserAuthenticationStatus();
    // this._getUserData();
  }

  ngOnDestroy(): void {
    this.authListenerSubs$.unsubscribe();
    this.authAdminListenerSubs$.unsubscribe();
    this.userDataListener$.unsubscribe();
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  public onCloseNav(): void {
    this.navToggle.close();
  }

  public onToggleNav(): void {
    this.navToggle.toggle();
  }

  public onLogout(): void {
    this.authService.logout();
    if (this.mobileQuery.matches) {
      this.navToggle.toggle();
    }
  }

  public showConnexionBtn(): boolean {
    return this.isUserAuthenticated || this.isAdminUserAuthenticated;
  }

  public prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }

  ////////////
  // PRIVATE
  ////////////
  private _getUserData(): void {
    this.user = this.authService.getUserData();
    this.userDataListener$ = this.authService.getUserDataListener().subscribe(
      (response) => {
        this.user = response;
        if (this.user) {
          this.userId = this.user._id;
        }
      },
      (error) => {
        console.log('user id error:', error);
      }
    );
  }

  private _getUserAuthenticationStatus(): void {
    this.isUserAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs$ = this.authService
      .getAuthStatus()
      .subscribe((isAuthenticated) => {
        this.isUserAuthenticated = isAuthenticated;
      });
    this.authService.autoAuthUser();
  }

  private _getAdminUserAuthenticationStatus(): void {
    this.isAdminUserAuthenticated = this.authService.getIsAdminAuth();
    this.authAdminListenerSubs$ = this.authService
      .getAdminAuthStatus()
      .subscribe((isAuthenticated) => {
        this.isAdminUserAuthenticated = isAuthenticated;
      });
    this.authService.autoAuthAdmin();
  }

  private _mobileQueryListener(): void {
    return this.changeDetectorRef.detectChanges();
  }
}
