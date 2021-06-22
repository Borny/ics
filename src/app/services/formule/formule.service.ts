import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

import { Formule } from 'src/app/models/formule.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FormuleService {
  private readonly _API_URL = environment.apiUrl;
  private readonly _FORMULE_URL = `${this._API_URL}/formule`;
  private readonly _FORMULES_URL = `${this._API_URL}/formules`;

  constructor(private http: HttpClient) {}

  public addFormule(data: Formule): Observable<string> {
    console.log('data', data);
    return this.http.post<string>(`${this._FORMULE_URL}`, data);
  }

  public updateFormule(data: Formule): Observable<string> {
    console.log('data', data);
    return this.http.put<string>(`${this._FORMULE_URL}/${data._id}`, data);
  }

  public getFormules(mode?: string): Observable<Formule[]> {
    return this.http.get<Formule[]>(`${this._FORMULES_URL}/${mode}`).pipe(
      shareReplay(),
      map((res) => res['formules'])
    );
  }

  public getFormule(formuleId: string): Observable<Formule> {
    return this.http.get<Formule>(`${this._FORMULE_URL}/${formuleId}`).pipe(
      shareReplay(),
      // tap((result) => console.log(result['message'])),
      map((res) => res['formule'])
    );
  }

  public deleteFormule(formule: Formule): Observable<{ message: string }> {
    console.log('delete formule', formule);
    return this.http.delete<{ message: string }>(
      `${this._FORMULE_URL}/${formule._id}`
    );
  }
}
