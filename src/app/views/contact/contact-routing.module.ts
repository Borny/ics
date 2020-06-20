import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactView } from './contact.component';

const routes: Routes = [
  {
    path: '',
    component: ContactView
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactRoutingModule { }
