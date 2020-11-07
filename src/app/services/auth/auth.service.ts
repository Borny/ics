import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { AdminAuth } from '../../models/adminLogin.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token: string;
  private _isAuth = false;
  private _isAdminAuth = false;
  private _authStatusListener$: Subject<boolean> = new Subject<boolean>();
  private _authAdminStatusListener$: Subject<boolean> = new Subject<boolean>();
  private _adminLoginFailed$: Subject<boolean> = new Subject<boolean>();
  private _tokenTimer: any;


  private readonly LOGIN_URL = environment.apiUrl + '/login';
  private readonly ADMIN_LOGIN_URL = environment.apiUrl + '/admin-login';
  // private readonly ADMIN_LOGIN_URL = environment.apiUrl + '/admin-loginn';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  public logout(): void {
    this._token = null;
    clearTimeout(this._tokenTimer);
    this._authStatusListener$.next(false);
    this._authAdminStatusListener$.next(false);
    this._clearAuthData();
    this.router.navigateByUrl('/');
  }

  public getToken() {
    return this._token;
  }

  // REGULAR USER
  public getIsAuth(): boolean {
    return this._isAuth;
  }

  public getAuthStatus(): Observable<boolean> {
    return this._authStatusListener$.asObservable();
  }

  public login(loginFormValue): void {
    console.log(loginFormValue)
    this.http.post<{ token: string, expiresIn: number }>(this.LOGIN_URL, loginFormValue)
      .subscribe(
        response => {
          console.log('user login');
          const token = response.token;
          this._token = token;
          if (token) {
            const expiresIn = response.expiresIn * 1000;
            this._setAuthTimeout(expiresIn);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresIn);
            this._saveAuthData(token, expirationDate);
            this._isAuth = true;
            this._authStatusListener$.next(true);
            this.router.navigateByUrl('/');
          }
        },
        error => {
          console.log('login error :', error);
        }
      );
  }

  public autoAuthUser(): void {
    const authInformation = this._getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this._token = authInformation.token;
      this._isAuth = true;
      this._setAuthTimeout(expiresIn);
      this._authStatusListener$.next(true);
    }
  }

  public signup(): void { }

  // ADMIN
  public getIsAdminAuth(): boolean {
    return this._isAdminAuth;
  }

  public getAdminAuthStatus(): Observable<boolean> {
    // console.log('auth service')
    return this._authAdminStatusListener$.asObservable();
  }

  public adminLogin(adminLoginFormValue: AdminAuth): void {
    this.http.post<{ token: string, expiresIn: number }>(this.ADMIN_LOGIN_URL, adminLoginFormValue)
      .subscribe(
        response => {
          console.log('admin login');
          const token = response.token;
          this._token = token;
          if (token) {
            const expiresIn = response.expiresIn * 1000;
            this._setAuthTimeout(expiresIn);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresIn);
            this._saveAuthData(token, expirationDate);
            this._isAdminAuth = true;
            this._authAdminStatusListener$.next(true);
            this.router.navigateByUrl('/admin');
            console.log('navigate');
          }
        },
        error => {
          console.log('login error :', error);
          this._adminLoginFailed$.next(true);
        }
      );
  }

  public autoAuthAdmin(): void {
    console.log('2 auto admin auth');
    const authInformation = this._getAuthData();
    if (!authInformation) {
      // console.log('auth information:', authInformation)
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    // console.log(expiresIn > 0)
    if (expiresIn > 0) {
      console.log('3 if');
      this._token = authInformation.token;
      this._isAdminAuth = true;
      this._setAuthTimeout(expiresIn);
      this._authAdminStatusListener$.next(true);
    }
  }

  public getAdminLoginFailed(): Observable<boolean> {
    return this._adminLoginFailed$.asObservable();
  }

  ////////////
  // PRIVATE
  ////////////

  private _saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private _clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private _getAuthData(): null | { token: string, expirationDate: Date } {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate)
    };
  }

  private _setAuthTimeout(duration: number): void {
    this._tokenTimer = setTimeout(() => {
      this.logout();
    },
      duration
    );
  }

}
