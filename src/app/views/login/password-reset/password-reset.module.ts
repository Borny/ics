import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';
import { MaterialModule } from '../../../angular-material/angular-material.module';

import { PasswordResetView } from './password-reset.component';
import { PasswordResetRoutingModule } from './password-reset-routing.module';

@NgModule({
  declarations: [
    PasswordResetView
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PasswordResetRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class PasswordResetModule { }
