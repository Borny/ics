import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutView } from './about.component';

const routes: Routes = [
  {
    path: '',
    component: AboutView
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
