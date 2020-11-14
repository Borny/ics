import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../angular-material/angular-material.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProfileView } from './profile.component';

@NgModule({
  declarations: [
    ProfileView
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [],
  providers: [],
})
export class ProfileViewModule { }
