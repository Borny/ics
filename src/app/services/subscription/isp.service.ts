import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { KidsFormData } from '../../models/kidsFormData.model';
import { catchError, map, tap } from 'rxjs/operators';
import { KidSubscription } from 'src/app/models/kidSubscription.model';

@Injectable({
  providedIn: 'root',
})
export class ISPService {
  public readonly ISP_SUBSCRIPTION_URL =
    environment.apiUrl + '/subscription/isp';
  public readonly SUBSCRIPTION_PRICE_URL =
    environment.apiUrl + '/subscription/isp/price';
  public readonly EMAIL_URL = environment.apiUrl + '/subscription/email';
  public readonly SUBSCRIPTION_CREDIT_CARD_URL =
    environment.apiUrl + '/subscription/credit-card';
  public readonly SUBSCRIPTION_OTHER_PAYMENT_URL =
    environment.apiUrl + '/subscription/other';

  constructor(private http: HttpClient, private router: Router) {}

  // delete
  // public sendAdultForm(formValues: AdultFormData): Observable<any> {
  //   return this.http.post(this.ADULT_SUBSCRIPTION_URL, formValues);
  // }

  public getSubscriptionPrice(): Observable<any> {
    return this.http.get<any>(this.SUBSCRIPTION_PRICE_URL);
  }

  // POST
  public validateSubscriptionOtherPayment(data: any): Observable<any> {
    return this.http.post(this.SUBSCRIPTION_OTHER_PAYMENT_URL, data);
  }

  public validateSubscriptionCardPayment(data: any): Observable<any> {
    return this.http.post(this.SUBSCRIPTION_CREDIT_CARD_URL, data);
  }

  // public makeCardPayment(data: any): Observable<any> {
  //   console.log(data)
  //   return this.http.post(this.PAYMENT_CREDIT_CARD_URL, data);
  // }

  // GET ONE
  // public getKid(memberId: string): Observable<any> {
  //   return this.http.get<any>(`${this.ISP_SUBSCRIPTION_URL}/${memberId}`).pipe(
  //     // tap((response) => console.log(response.message)),
  //     map((response) => response['data'])
  //   );
  // }

  // GET ALL
  // public getKidData(): Observable<any> {
  //   return this.http.get<any>(`${this.ISP_SUBSCRIPTION_URL}`).pipe(
  //     // tap((response) => console.log(response.message)),
  //     map((response) => response['data'])
  //   );
  // }

  // UPDATE
  // public updateKid(member: KidSubscription): Observable<any> {
  //   // console.log(member);
  //   return this.http
  //     .put<any>(`${this.ISP_SUBSCRIPTION_URL}/${member._id}`, member)
  //     .pipe(tap((response) => console.log(response.message)));
  // }

  // DELETE
  // public deleteKid(memberId: string): Observable<any> {
  //   return this.http
  //     .delete<any>(`${this.ISP_SUBSCRIPTION_URL}/${memberId}`)
  //     .pipe(tap((response) => console.log(response.message)));
  // }

  // EMAIL
  public checkEmail(email: string): Observable<{ message: string }> {
    const emailValue = { email };
    return this.http.post<{ message: string }>(this.EMAIL_URL, emailValue);
  }
}
