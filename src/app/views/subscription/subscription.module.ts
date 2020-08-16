import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../angular-material/angular-material.module';
import { SharedModule } from '../../shared/shared.module';
import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionView } from './subscription.component';
import { FirstSubscriptionFormComponent } from '../../organisms/subscription-forms/first-subscription-form/first-subscription-form.component';
import { RenewalSubscriptionFormComponent } from '../../organisms/subscription-forms/renewal-subscription-form/renewal-subscription-form.component';
import { AdultSubscriptionFormComponent } from '../../organisms/subscription-forms/adult-subscription-form/adult-subscription-form.component';

@NgModule({
  declarations: [
    SubscriptionView,
    FirstSubscriptionFormComponent,
    RenewalSubscriptionFormComponent,
    AdultSubscriptionFormComponent
  ],
  imports: [
    CommonModule,
    SubscriptionRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    FirstSubscriptionFormComponent,
    RenewalSubscriptionFormComponent,
    AdultSubscriptionFormComponent
  ],
  providers: [],
})
export class SubscriptionViewModule { }
