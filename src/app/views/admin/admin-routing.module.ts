
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminView } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminView
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
