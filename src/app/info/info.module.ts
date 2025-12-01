import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConceptOverviewComponent } from './components/concept-overview/concept-overview.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { InfoRoutingModule } from './info-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EmailJustificationComponent } from './components/email-justification/email-justification.component';
import { PhoneAgreementComponent } from './components/phone-agreement/phone-agreement.component';

import { DocsLayoutComponent } from './components/docs-layout/docs-layout.component';
import { DocsListComponent } from './components/docs-list/docs-list.component';
import { DocViewerComponent } from './components/doc-viewer/doc-viewer.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ConceptOverviewComponent,
    AboutUsComponent,
    EmailJustificationComponent,
    PhoneAgreementComponent,
    DocsLayoutComponent,
    DocsListComponent,
    DocViewerComponent,
  ],
  imports: [
    CommonModule,
    InfoRoutingModule,
    SharedModule,
    MatMenuModule,
    MatIconModule,
  ],
})
export class InfoModule {}
