import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramView } from './programs.component';

const routes: Routes = [
  {
    path: '',
    component: ProgramView
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramsRoutingModule { }
