import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConceptOverviewComponent } from './components/concept-overview/concept-overview.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { InfoRoutingModule } from './info-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EmailJustificationComponent } from './components/email-justification/email-justification.component';
import { PhoneAgreementComponent } from './components/phone-agreement/phone-agreement.component';


@NgModule({
  declarations: [
    ConceptOverviewComponent,
    AboutUsComponent,
    EmailJustificationComponent,
    PhoneAgreementComponent
  ],
  imports: [
    CommonModule,
    InfoRoutingModule,
    SharedModule
  ]
})
export class InfoModule { }
