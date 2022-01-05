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
  public readonly ISP_SUBSCRIPTION_URL = environment.apiUrl + '/isp';
  public readonly ISP_SUBSCRIPTION_PRICE_URL =
    environment.apiUrl + '/isp/price';
  public readonly EMAIL_URL = environment.apiUrl + '/subscription/email';
  public readonly SUBSCRIPTION_CREDIT_CARD_URL =
    environment.apiUrl + '/isp/credit-card';
  public readonly SUBSCRIPTION_OTHER_PAYMENT_URL =
    environment.apiUrl + '/isp/other';

  constructor(private http: HttpClient, private router: Router) {}

  // delete
  // public sendAdultForm(formValues: AdultFormData): Observable<any> {
  //   return this.http.post(this.ADULT_SUBSCRIPTION_URL, formValues);
  // }

  public getSubscriptionPrice(): Observable<{
    message: string;
    priceObject: { price: number };
  }> {
    return this.http.get<{ message: string; priceObject: { price: number } }>(
      this.ISP_SUBSCRIPTION_PRICE_URL
    );
  }

  public updateISPSubscriptionPrice(price: number): Observable<{
    message: string;
  }> {
    return this.http.put<{ message: string }>(
      `${this.ISP_SUBSCRIPTION_PRICE_URL}`,
      { price }
    );
  }

  // GET
  public getSubscriptionData(): Observable<any> {
    return this.http.get<any>(this.ISP_SUBSCRIPTION_URL);
  }

  public getMember(memberId: string): Observable<any> {
    return this.http
      .get<any>(`${this.ISP_SUBSCRIPTION_URL}/${memberId}`)
      .pipe(map((response) => response['data']));
  }

  // EMAIL
  public checkEmail(email: string): Observable<{ message: string }> {
    const emailValue = { email };
    return this.http.post<{ message: string }>(this.EMAIL_URL, emailValue);
  }

  // POST
  public validateSubscriptionOtherPayment(data: any): Observable<any> {
    return this.http.post(this.SUBSCRIPTION_OTHER_PAYMENT_URL, data);
  }

  public validateSubscriptionCardPayment(data: any): Observable<any> {
    return this.http.post(this.SUBSCRIPTION_CREDIT_CARD_URL, data);
  }

  // UPDATE
  public updateKid(member: KidSubscription): Observable<any> {
    return this.http
      .put<any>(`${this.ISP_SUBSCRIPTION_URL}/${member._id}`, member)
      .pipe(tap((response) => console.log(response.message)));
  }

  // DELETE
  public deleteKid(memberId: string): Observable<any> {
    return this.http
      .delete<any>(`${this.ISP_SUBSCRIPTION_URL}/${memberId}`)
      .pipe(tap((response) => console.log(response.message)));
  }
}
