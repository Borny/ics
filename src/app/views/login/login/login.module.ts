import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';
import { MaterialModule } from '../../../angular-material/angular-material.module';

import { LoginView } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [
    LoginView
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class LoginViewModule { }
