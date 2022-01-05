import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IspView } from './isp.component';

const routes: Routes = [
  {
    path: '',
    component: IspView
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IspRoutingModule { }
