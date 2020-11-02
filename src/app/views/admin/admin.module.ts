import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../angular-material/angular-material.module';
import { SharedModule } from '../../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminView } from './admin.component';
import { MemberDataTable } from 'src/app/organisms/member-data-table/member-data-table.component';
import { SubscriptionsAdminOrganism } from 'src/app/organisms/subscriptions-admin-organism/subscriptions-admin-organism.component';

@NgModule({
  declarations: [
    AdminView,
    MemberDataTable,
    SubscriptionsAdminOrganism
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MaterialModule,
  ],
  exports: [
    MemberDataTable,
    SubscriptionsAdminOrganism
  ]
})
export class AdminViewModule { }
