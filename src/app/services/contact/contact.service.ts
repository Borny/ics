import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Message } from '../../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) { }

  public postMessage(messageValues: Message) {
    console.log(messageValues);
  }
}
