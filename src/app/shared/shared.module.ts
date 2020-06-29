import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { IcsLogoComponent } from './ics-logo/ics-logo.component';
import { ButtonComponent } from '../atoms/button/button.component';

@NgModule({
  declarations: [
    // HeaderComponent,
    FooterComponent,
    IcsLogoComponent,
    ButtonComponent
  ],
  imports: [CommonModule],
  exports: [
    FooterComponent,
    IcsLogoComponent,
    ButtonComponent
  ],
  providers: [],
})
export class SharedModule { }
