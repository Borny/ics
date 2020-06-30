import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AboutView } from './about.component';
import { MaterialModule } from '../../angular-material/angular-material.module';

@NgModule({
  declarations: [AboutView],
  imports: [
    CommonModule,
    AboutRoutingModule,
    SharedModule,
    MaterialModule
  ],
  exports: [],
  providers: [],
})
export class AboutViewModule { }
