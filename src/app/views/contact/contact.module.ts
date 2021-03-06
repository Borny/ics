import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../angular-material/angular-material.module';
import { ContactRoutingModule } from './contact-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ContactView } from './contact.component';

@NgModule({
  declarations: [
    ContactView
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [],
  providers: [],
})
export class ContactViewModule { }
