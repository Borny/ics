
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermsOfServiceView } from './terms-of-service.component';

const routes: Routes = [
  {
    path: '',
    component: TermsOfServiceView
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsOfServiceRoutingModule { }
