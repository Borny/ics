import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../angular-material/angular-material.module';
import { SharedModule } from '../../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminView } from './admin.component';
import { MemberDataTable } from 'src/app/organisms/member-data-table/member-data-table.component';
import { SubscriptionsAdminOrganism } from 'src/app/organisms/subscriptions-admin-organism/subscriptions-admin-organism.component';
import { OrganismAdminFormule } from 'src/app/organisms/admin-formule/organism-admin-formule.component';
import { OrganismAdminUsers } from 'src/app/organisms/organism-admin-users/organism-admin-users.component';
import { OrganismTableUsers } from 'src/app/organisms/organism-table-users/organism-table-users.component';
import { DialogUser } from 'src/app/dialogs/dialog-user/dialog-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogMember } from 'src/app/dialogs/dialog-member/dialog-member.component';
import { FormuleDialog } from 'src/app/organisms/admin-formule/formule-dialog/formule-dialog.component';

@NgModule({
  declarations: [
    AdminView,
    MemberDataTable,
    SubscriptionsAdminOrganism,
    OrganismAdminFormule,
    OrganismAdminUsers,
    OrganismTableUsers,
    DialogUser,
    DialogMember,
    FormuleDialog,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
    MemberDataTable,
    SubscriptionsAdminOrganism,
    OrganismAdminFormule,
    OrganismAdminUsers,
    OrganismTableUsers,
  ],
})
export class AdminViewModule {}
