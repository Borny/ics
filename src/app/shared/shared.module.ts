import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { IcsLogoComponent } from './ics-logo/ics-logo.component';
import { AtomButton } from '../atoms/button/button.component';
import { MoleculeCardFormule } from '../molecules/card-formule/card-formule.component';
import { MaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [
    // HeaderComponent,
    FooterComponent,
    IcsLogoComponent,
    AtomButton,
    MoleculeCardFormule,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [FooterComponent, IcsLogoComponent, AtomButton, MoleculeCardFormule],
  providers: [],
})
export class SharedModule {}
