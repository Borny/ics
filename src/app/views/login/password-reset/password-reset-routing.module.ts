import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasswordResetView } from './password-reset.component';

const routes: Routes = [
  {
    path: '',
    component: PasswordResetView
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordResetRoutingModule { }
