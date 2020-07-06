import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Message } from '../../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private readonly URL = 'http://localhost:7000/';

  constructor(private http: HttpClient) { }

  public postMessage(messageValues: Message): Observable<any> {
    return this.http.post(`${this.URL}`, messageValues);
  }
}
