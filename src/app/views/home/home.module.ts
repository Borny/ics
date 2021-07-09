import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeView } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../angular-material/angular-material.module';

@NgModule({
  declarations: [HomeView],
  imports: [CommonModule, SharedModule, HomeRoutingModule, MaterialModule],
  exports: [],
  providers: [],
})
export class HomeViewModule {}
