import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MediaView } from './media.component';

const routes: Routes = [
  {
    path: '',
    component: MediaView
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediaRoutingModule { }
