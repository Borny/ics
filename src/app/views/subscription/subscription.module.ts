import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../angular-material/angular-material.module';
import { SharedModule } from '../../shared/shared.module';
import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionView } from './subscription.component';
import { AdultSubscriptionFormComponent } from '../../organisms/subscription-forms/adult-subscription-form/adult-subscription-form.component';
import { KidsSubscriptionFormComponent } from '../../organisms/subscription-forms/kids-subscription-form/kids-subscription-form.component';

@NgModule({
  declarations: [
    SubscriptionView,
    AdultSubscriptionFormComponent,
    KidsSubscriptionFormComponent
  ],
  imports: [
    CommonModule,
    SubscriptionRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    KidsSubscriptionFormComponent,
    AdultSubscriptionFormComponent
  ],
  providers: [],
})
export class SubscriptionViewModule { }
