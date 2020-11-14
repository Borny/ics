import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';

import { mergeMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { User } from '../../models/user.model';
import { AdminAuth } from '../../models/adminLogin.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: User;
  private _token: string;
  private _isAuth = false;
  private _isAdminAuth = false;

  public userDataListener$: Subject<User> = new Subject<User>();

  private _tokenTimer: any; // tslint doesn't recognize Timeout type...

  private _authStatusListener$: Subject<boolean> = new Subject<boolean>();
  private _authAdminStatusListener$: Subject<boolean> = new Subject<boolean>();
  private _userLoginFailed$: Subject<{ failed: boolean, message: string }> = new Subject<{ failed: boolean, message: string }>();
  private _adminLoginFailed$: Subject<boolean> = new Subject<boolean>();

  private readonly SIGN_UP_URL = environment.apiUrl + '/sign-up';
  private readonly LOGIN_URL = environment.apiUrl + '/login';
  private readonly GET_USER_URL = environment.apiUrl + '/get-user';
  private readonly ADMIN_LOGIN_URL = environment.apiUrl + '/admin-login';
  private readonly REQUEST_PASSWORD_URL = environment.apiUrl + '/request-reset-password';
  private readonly VALIDATE_PASSWORD_URL = environment.apiUrl + '/valid-password-token';
  private readonly RESET_PASSWORD_URL = environment.apiUrl + '/new-password';
  private readonly UPDATE_USER_URL = environment.apiUrl + '/update-user';

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
    this.userDataListener$.next(null);
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

  // User data
  public getUserData(): User {
    return this._user;
  }

  public getUserDataListener(): Observable<User> {
    return this.userDataListener$.asObservable();
  }

  public login(loginFormValue: User): void {
    this.http.post<{ userId: string, token: string, expiresIn: number }>(this.LOGIN_URL, loginFormValue)
      .pipe(
        mergeMap((result) => {
          const token = result.token;
          const userId = result.userId;
          this._token = token;
          if (token) {
            const expiresIn = result.expiresIn * 1000;
            this._setAuthTimeout(expiresIn);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresIn);
            this._saveAuthData(userId, token, expirationDate);
            this._isAuth = true;
            this._authStatusListener$.next(true);
            this.router.navigateByUrl('/');
          }
          return this.getUser(userId);
        })
      )
      .subscribe(
        response => {
          if (response.user) {
            this._user = response.user;
            this.userDataListener$.next(response.user);
          }
        },
        error => {
          console.log('login error :', error.error.message);
          this._userLoginFailed$.next({ failed: true, message: error.error.message });
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
      this.getUser(authInformation.userId)
        .subscribe(
          response => {
            this._user = response.user;
            this.userDataListener$.next(this._user);
          },
          err => {
            console.log(err);
          }
        );
    }
  }

  public signup(formValue: User): Observable<any> { // change the type // change the type
    return this.http.post<any>(`${this.SIGN_UP_URL}`, formValue);
  }

  public getUserLoginFailed(): Observable<{ failed: boolean, message: string }> {
    return this._userLoginFailed$.asObservable();
  }

  public getUser(userId: string): Observable<{ user: User }> {
    return this.http.get<{ user: User }>(`${this.GET_USER_URL}/${userId}`);
  }

  public updateUser(userId: string, firstName: string, lastName: string, nickName: string, image: File | string): Observable<Response> {
    let formData: User | FormData;
    if (typeof (image) === 'object') {
      formData = new FormData();
      formData.append('_id', userId);
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('nickName', nickName);
      formData.append('image', image);
    } else {
      formData = {
        _id: userId,
        firstName,
        lastName,
        nickName,
        profileImagePath: image
      };
    }

    return this.http.put<Response>(`${this.UPDATE_USER_URL}/:userId`, formData);
  }

  // ADMIN
  public getIsAdminAuth(): boolean {
    return this._isAdminAuth;
  }

  public getAdminAuthStatus(): Observable<boolean> {
    return this._authAdminStatusListener$.asObservable();
  }

  public adminLogin(adminLoginFormValue: AdminAuth): void {
    this.http.post<{ token: string, admin: string, expiresIn: number }>(this.ADMIN_LOGIN_URL, adminLoginFormValue)
      .subscribe(
        response => {
          const token = response.token;
          const admin = response.admin;
          this._token = token;
          if (token) {
            const expiresIn = response.expiresIn * 1000;
            this._setAuthTimeout(expiresIn);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresIn);
            this._saveAdminAuthData(token, admin, expirationDate);
            this._isAdminAuth = true;
            this._authAdminStatusListener$.next(true);
            this.router.navigateByUrl('/admin');
          }
        },
        error => {
          console.log('login error :', error);
          this._adminLoginFailed$.next(true);
        }
      );
  }

  public autoAuthAdmin(): void {
    const authInformation = this._getAdminAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this._token = authInformation.token;
      this._isAdminAuth = true;
      this._setAuthTimeout(expiresIn);
      this._authAdminStatusListener$.next(true);
    }
  }

  public getAdminLoginFailed(): Observable<boolean> {
    return this._adminLoginFailed$.asObservable();
  }

  // RESET PASSWORD
  public requestPassword(formValue: { 'email': string }): Observable<any> { // change the type // change the type
    return this.http.post(this.REQUEST_PASSWORD_URL, formValue);
  }

  public validPasswordToken(formValue: { 'resetToken': string }): Observable<any> { // change the type// change the type
    return this.http.post(`${this.VALIDATE_PASSWORD_URL}`, formValue);
  }

  public newPassword(formValue: { resetToken: string, newPassword: string }): Observable<any> { // change the type// change the type
    return this.http.post(`${this.RESET_PASSWORD_URL}`, formValue);
  }

  ////////////
  // PRIVATE
  ////////////

  private _saveAuthData(userId: string, token: string, expirationDate: Date): void {
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private _saveAdminAuthData(token: string, admin: string, expirationDate: Date): void {
    localStorage.setItem('token', token);
    localStorage.setItem('admin', admin);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private _clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private _getAuthData(): null | { userId: string, token: string, expirationDate: Date } {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      userId,
      token,
      expirationDate: new Date(expirationDate)
    };
  }

  private _getAdminAuthData(): null | { token: string, expirationDate: Date } {
    const token = localStorage.getItem('token');
    const admin = localStorage.getItem('admin');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate || !admin) {
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
