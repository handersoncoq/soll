import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConceptOverviewComponent } from './components/concept-overview/concept-overview.component';

import { MatIconModule } from '@angular/material/icon';

import { AboutUsComponent } from './components/about-us/about-us.component';
import { InfoRoutingModule } from './info-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ConceptOverviewComponent,
    AboutUsComponent,
  ],
  imports: [
    CommonModule,
    InfoRoutingModule,
    MatIconModule,
    SharedModule
  ]
})
export class InfoModule { }
