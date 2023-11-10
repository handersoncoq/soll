import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConceptOverviewComponent } from './components/concept-overview/concept-overview.component';

import { MatIconModule } from '@angular/material/icon';

import { AboutUsComponent } from './components/about-us/about-us.component';
import { HelpMeComponent } from './components/help-me/help-me.component';
import { InfoRoutingModule } from './info-routing.module';
import { InquireComponent } from './components/inquire/inquire.component';
import { InfoTemplateComponent } from './templates/info-template/info-template.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ConceptOverviewComponent,
    AboutUsComponent,
    HelpMeComponent,
    InquireComponent,
    InfoTemplateComponent,
  ],
  imports: [
    CommonModule,
    InfoRoutingModule,
    MatIconModule,
    SharedModule
  ]
})
export class InfoModule { }
