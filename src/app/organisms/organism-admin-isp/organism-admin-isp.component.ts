import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { KidSubscription } from 'src/app/models/kidSubscription.model';
import { SubscriptionAgeMode } from 'src/app/models/SubscriptionAgeMode.enum';
import { ISPService } from 'src/app/services/subscription/isp.service';

@Component({
  selector: 'organism-admin-isp',
  templateUrl: './organism-admin-isp.component.html',
  styleUrls: ['./organism-admin-isp.component.scss'],
})
export class OrganismAdminISP implements OnInit {
  public name: string;
  public ISPPriceForm: FormGroup;
  public subscriptionData: KidSubscription[] = [];
  public isLoading = true;
  public ISPSubscriptionPrice: number;

  public readonly subscriptionAgeMode: SubscriptionAgeMode =
    SubscriptionAgeMode.SubscriptionAgeModeKids;

  private readonly _ADMIN_MODE = 'admin';

  constructor(
    private ispService: ISPService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._getSubscriptionPrice();
  }

  public onUpdateUsers(): void {
    this._getSubscriptionPrice();
  }

  public onSubmit(): void {
    this.isLoading = true;
    if (this.ISPPriceForm.invalid) {
      return;
    }

    this.ispService
      .updateISPSubscriptionPrice(this.ISPPriceForm.value.price)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        ({ message }) => {
          // SNACKBAR here
          this._snackBar.open(`Le prix a bien été mis à jour `);
        },
        (error) => {
          this._snackBar.open(`Le prix n'a pas été mis à jour`);
        }
      );
  }

  private _getSubscriptionPrice(): void {
    this.ispService.getSubscriptionPrice().subscribe(
      ({ priceObject }) => {
        this.ISPSubscriptionPrice = priceObject.price;
        this._initPriceForm(priceObject.price);
      },
      (error) => {
        this.isLoading = false;
        this._snackBar.open('Imposssible de récupérer le prix');
      }
    );
  }

  private _getSubscriptions(): void {
    this.ispService
      .getSubscriptionData()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(({ data }: { data: KidSubscription[] }) => {
        this.subscriptionData = data;
      });
  }

  private _initPriceForm(price: number): void {
    this.ISPPriceForm = this.formBuilder.group({
      price: this.formBuilder.control(price || null, [
        Validators.required,
        Validators.min(1),
      ]),
    });

    this._getSubscriptions();
  }
}
