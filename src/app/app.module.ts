import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './angular-material/angular-material.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { IcsLogoComponent } from './shared/ics-logo/ics-logo.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IcsLogoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
