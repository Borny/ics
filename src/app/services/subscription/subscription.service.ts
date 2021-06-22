import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { AdultFormData } from '../../models/adultFormData.model';
import { KidsFormData } from '../../models/kidsFormData.model';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  public readonly NURSERY_SUBSCRIPTION_URL =
    environment.apiUrl + '/subscription/nursery';
  public readonly ELEMENTARY_SUBSCRIPTION_URL =
    environment.apiUrl + '/subscription/elementary';
  public readonly KID_SUBSCRIPTION_URL =
    environment.apiUrl + '/subscription/kid';
  public readonly ADULT_SUBSCRIPTION_URL =
    environment.apiUrl + '/subscription/adult';
  public readonly SUBSCRIPTION_URL = environment.apiUrl + '/subscription/';
  public readonly COUPON_URL = environment.apiUrl + '/subscription/coupon';

  constructor(private http: HttpClient, private router: Router) {}

  // SEND DATA
  public sendKidsForm(formValues: KidsFormData): Observable<any> {
    let url: string;
    if (formValues.ageGroup === 0) {
      url = this.NURSERY_SUBSCRIPTION_URL;
    } else if (formValues.ageGroup === 1) {
      url = this.ELEMENTARY_SUBSCRIPTION_URL;
    } else if (formValues.ageGroup === 2) {
      // url = this.TEEN_SUBSCRIPTION_URL;
    }
    return this.http.post(`${url}`, formValues);
  }

  // delete
  public sendAdultForm(formValues: AdultFormData): Observable<any> {
    return this.http.post(this.ADULT_SUBSCRIPTION_URL, formValues);
  }

  // POST
  public addSubscription(formValues: any): Observable<any> {
    return this.http.post(this.SUBSCRIPTION_URL, formValues);
  }

  // GET DATA
  // public getNurseryData(): Observable<any> {
  //   return this.http.get<any>(`${this.NURSERY_SUBSCRIPTION_URL}`);
  // }

  // public getElementaryData(): Observable<any> {
  //   return this.http.get<any>(`${this.ELEMENTARY_SUBSCRIPTION_URL}`);
  // }

  public getKidData(): Observable<any> {
    return this.http.get<any>(`${this.KID_SUBSCRIPTION_URL}`).pipe(
      tap((response) => console.log(response.message)),
      map((response) => response['data'])
    );
  }

  public getAdultData(): Observable<any> {
    return this.http.get<any>(`${this.ADULT_SUBSCRIPTION_URL}`).pipe(
      tap((response) => console.log(response.message)),
      map((response) => response['data'])
    );
  }

  // public fetchExcelFile(): void {
  //   console.log('gettting the excel file');
  //   this.router.navigate([`${this.ADULT_SUBSCRIPTION_URL}/excel`]);
  // }

  // COUPON
  public validateCoupon(
    couponInput: string,
    formuleId: string
  ): Observable<{ message: string; valid: boolean; couponValue?: number }> {
    console.log('coupon value', couponInput);
    const code = { couponInput, formuleId };
    return this.http
      .post<{ message: string; valid: boolean; amount?: number }>(
        this.COUPON_URL,
        code
      )
      .pipe(
        tap((res) => console.log(res['message']))
        // catchError((err) => {
        //   console.log(res['message']);
        //   return err;
        // })
      );
  }
}
