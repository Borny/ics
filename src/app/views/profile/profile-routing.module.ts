import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileView } from './profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileView
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule { }
