import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../angular-material/angular-material.module';
import { IspRoutingModule } from './isp.routing';
import { SharedModule } from '../../shared/shared.module';
import { IspView } from './isp.component';

@NgModule({
  declarations: [IspView],
  imports: [
    CommonModule,
    IspRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [],
  providers: [],
})
export class IspViewModule {}
