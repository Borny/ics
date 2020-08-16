import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  public readonly FIRST_SUBSCRIPTION_URL = environment.apiUrl + '/subscription/first';
  public readonly RENEWAL_SUBSCRIPTION_URL = environment.apiUrl + '/subscription/renewal';
  public readonly ADULT_SUBSCRIPTION_URL = environment.apiUrl + '/subscription/adult';

  constructor(private http: HttpClient) { }

  public sendFirstForm(formValues: any): Observable<any> {
    return this.http.post(`${this.FIRST_SUBSCRIPTION_URL}`, formValues);
  }

  public sendRenewalForm(formValues: any): Observable<any> {
    return this.http.post(`${this.FIRST_SUBSCRIPTION_URL}`, formValues);
  }

  public sendAdultForm(formValues: any): Observable<any> {
    // const birthdateEdit = formValues.birthdate.toLocaleDateString();
    // formValues.birthdate = birthdateEdit;
    console.log(formValues.birthdate.toLocaleDateString());
    return this.http.post(`${this.ADULT_SUBSCRIPTION_URL}`, formValues);
  }

}
