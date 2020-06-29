import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeView } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [HomeView],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ],
  exports: [],
  providers: [],
})
export class HomeViewModule { }
