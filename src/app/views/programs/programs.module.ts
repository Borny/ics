import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramsRoutingModule } from './programs-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../angular-material/angular-material.module';

import { ProgramView } from './programs.component';
import { SessionsComponent } from '../../organisms/sessions/sessions.component';

@NgModule({
  declarations: [
    ProgramView,
    SessionsComponent
  ],
  imports: [CommonModule,
    SharedModule,
    MaterialModule,
    ProgramsRoutingModule],
  exports: [
    SessionsComponent
  ],
  providers: [],
})
export class ProgramsViewModule { }
