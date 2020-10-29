import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../angular-material/angular-material.module';
import { SharedModule } from '../../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminView } from './admin.component';
import { MemberDataTab } from 'src/app/organisms/member-data-tab/member-data-tab.component';

@NgModule({
  declarations: [
    AdminView,
    MemberDataTab
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MaterialModule,
  ],
  exports: [
    MemberDataTab
  ]
})
export class AdminViewModule { }
