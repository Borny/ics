import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminLoginView } from './admin-login.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLoginView
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLoginRoutingModule { }
