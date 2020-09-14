import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { AdultFormData } from '../../models/adultFormData.model';
import { AdultData } from '../../models/adultData.model';
import { KidsFormData } from '../../models/kidsFormData.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  public readonly FIRST_SUBSCRIPTION_URL = environment.apiUrl + '/subscription/first';
  public readonly RENEWAL_SUBSCRIPTION_URL = environment.apiUrl + '/subscription/renewal';
  public readonly ADULT_SUBSCRIPTION_URL = environment.apiUrl + '/subscription/adult';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public sendFirstForm(formValues: KidsFormData): Observable<any> {
    return this.http.post(`${this.FIRST_SUBSCRIPTION_URL}`, formValues);
  }

  public sendRenewalForm(formValues: KidsFormData): Observable<any> {
    return this.http.post(`${this.FIRST_SUBSCRIPTION_URL}`, formValues);
  }

  public sendAdultForm(formValues: AdultFormData): Observable<any> {
    return this.http.post(`${this.ADULT_SUBSCRIPTION_URL}`, formValues);
  }

  public getAdultData(): Observable<any> {
    return this.http.get<any>(`${this.ADULT_SUBSCRIPTION_URL}`);
  }

  // TODO: delete when done
  // public deleteEntry(id: number): Observable<boolean> {
  //   return this.http.delete<boolean>(`${this.ADULT_SUBSCRIPTION_URL}`);
  // }

  public fetchExcelFile(): void {
    console.log('gettting the excel file')
    this.router.navigate([`${this.ADULT_SUBSCRIPTION_URL}/excel`]);
  }

}
