import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';
import { MaterialModule } from '../../../angular-material/angular-material.module';

import { PasswordRequestView } from './password-request.component';
import { PasswordRequestRoutingModule } from './password-request-routing.module';

@NgModule({
  declarations: [
    PasswordRequestView
  ],
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    PasswordRequestRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class PasswordRequestModule { }
