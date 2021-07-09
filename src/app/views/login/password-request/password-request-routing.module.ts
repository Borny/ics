import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasswordRequestView } from './password-request.component';

const routes: Routes = [
  {
    path: '',
    component: PasswordRequestView
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordRequestRoutingModule { }
