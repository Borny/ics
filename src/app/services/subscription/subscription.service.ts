import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { AdultFormData } from '../../models/adultFormData.model';
import { KidsFormData } from '../../models/kidsFormData.model';
import { catchError, map, tap } from 'rxjs/operators';
import { KidSubscription } from 'src/app/models/kidSubscription.model';
import { AdultSubscriptionFormComponent } from 'src/app/organisms/subscription-forms/adult-subscription-form/adult-subscription-form.component';
import { AdultSubscription } from 'src/app/models/adultSubscription.model';

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
  // public readonly SUBSCRIPTION_URL = environment.apiUrl + '/subscription/';
  public readonly SUBSCRIPTION_CREDIT_CARD_URL =
    environment.apiUrl + '/subscription/credit-card';
  public readonly SUBSCRIPTION_OTHER_PAYMENT_URL =
    environment.apiUrl + '/subscription/other';
  public readonly EMAIL_URL = environment.apiUrl + '/subscription/email';
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
  public validateSubscriptionOtherPayment(data: any): Observable<any> {
    return this.http.post(this.SUBSCRIPTION_OTHER_PAYMENT_URL, data);
  }

  public validateSubscriptionCardPayment(data: any): Observable<any> {
    return this.http.post(this.SUBSCRIPTION_CREDIT_CARD_URL, data);
  }

  // GET ONE
  public getKid(memberId: string): Observable<any> {
    return this.http.get<any>(`${this.KID_SUBSCRIPTION_URL}/${memberId}`).pipe(
      // tap((response) => console.log(response.message)),
      map((response) => response['data'])
    );
  }

  public getAdult(memberId: string): Observable<any> {
    return this.http
      .get<any>(`${this.ADULT_SUBSCRIPTION_URL}/${memberId}`)
      .pipe(
        // tap((response) => console.log(response.message)),
        map((response) => response['data'])
      );
  }

  // GET ALL
  public getKidData(): Observable<any> {
    return this.http.get<any>(`${this.KID_SUBSCRIPTION_URL}`).pipe(
      // tap((response) => console.log(response.message)),
      map((response) => response['data'])
    );
  }

  public getAdultData(): Observable<any> {
    return this.http.get<any>(`${this.ADULT_SUBSCRIPTION_URL}`).pipe(
      // tap((response) => console.log(response.message)),
      map((response) => response['data'])
    );
  }

  // UPDATE
  public updateKid(member: KidSubscription): Observable<any> {
    // console.log(member);
    return this.http
      .put<any>(`${this.KID_SUBSCRIPTION_URL}/${member._id}`, member)
      .pipe(tap((response) => console.log(response.message)));
  }

  public updateAdult(member: AdultSubscription): Observable<any> {
    // console.log(member);
    return this.http
      .put<any>(`${this.ADULT_SUBSCRIPTION_URL}/${member._id}`, member)
      .pipe(tap((response) => console.log(response.message)));
  }

  // DELETE
  public deleteKid(memberId: string): Observable<any> {
    return this.http
      .delete<any>(`${this.KID_SUBSCRIPTION_URL}/${memberId}`)
      .pipe(tap((response) => console.log(response.message)));
  }

  public deleteAdult(memberId: string): Observable<any> {
    return this.http
      .delete<any>(`${this.ADULT_SUBSCRIPTION_URL}/${memberId}`)
      .pipe(tap((response) => console.log(response.message)));
  }

  // COUPON
  public validateCoupon(
    couponInput: string,
    formuleId: string
  ): Observable<{ message: string; valid: boolean; couponValue?: number }> {
    const code = { couponInput, formuleId };
    return this.http.post<{ message: string; valid: boolean; amount?: number }>(
      this.COUPON_URL,
      code
    );
  }

  // EMAIL
  public checkEmail(email: string): Observable<{ message: string }> {
    const emailValue = { email };
    return this.http.post<{ message: string }>(this.EMAIL_URL, emailValue);
  }
}
