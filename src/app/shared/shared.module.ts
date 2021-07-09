import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../angular-material/angular-material.module';
import { FooterComponent } from './footer/footer.component';
import { IcsLogoComponent } from './ics-logo/ics-logo.component';
import { AtomButton } from '../atoms/button/button.component';
import { AtomSpinner } from '../atoms/spinner/spinner.component';
import { AtomLabelLine } from '../atoms/label-line/atom-label-line.component';
import { MoleculeCardFormule } from '../molecules/card-formule/card-formule.component';
import { FilterPipe } from '../pipes/filter.pipe';

@NgModule({
  declarations: [
    // HeaderComponent,
    FooterComponent,
    IcsLogoComponent,
    AtomButton,
    AtomSpinner,
    AtomLabelLine,
    MoleculeCardFormule,
    FilterPipe,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    FooterComponent,
    IcsLogoComponent,
    AtomButton,
    AtomSpinner,
    AtomLabelLine,
    MoleculeCardFormule,
    FilterPipe,
  ],
  providers: [],
})
export class SharedModule {}
