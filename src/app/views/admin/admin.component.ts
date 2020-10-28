import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { SubscriptionService } from '../../services/subscription/subscription.service';
import { AdultData } from '../../models/adultData.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.scss']
})

export class AdminView implements OnInit {

  public adultData: AdultData[] = [];
  public isLoading = false;

  public adultError = false;

  public readonly ADULT_EXCEL_URL = `${environment.apiUrl}/subscription/adult/excel`;

  constructor(
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this.getAdultInfo();
  }

  public getAdultInfo(): void {
    this.isLoading = true;
    this.subscriptionService.getAdultData()
      .subscribe(
        response => {
          console.log('Adult data :', response);
          this.isLoading = false;
          this.adultData = response.data;
        },
        err => {
          console.log('get adult data error :', err);
          this.isLoading = false;
          this.adultError = true;
        }
      );
  }

  // public deleteEntry(id: number) {
  //   console.log(id);
  //   this.isLoading = true;
  //   this.subscriptionService.deleteEntry(id)
  //     .subscribe(
  //       response => {
  //         console.log(response);
  //         this.isLoading = false;
  //         location.reload();
  //       }, err => { console.log(err); this.isLoading = false; });
  // }

}
