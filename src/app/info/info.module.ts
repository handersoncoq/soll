import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConceptOverviewComponent } from './components/concept-overview/concept-overview.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HelpMeComponent } from './components/help-me/help-me.component';
import { InfoRoutingModule } from './info-routing.module';
import { InquireComponent } from './components/inquire/inquire.component';



@NgModule({
  declarations: [
    ConceptOverviewComponent,
    AboutUsComponent,
    HelpMeComponent,
    InquireComponent
  ],
  imports: [
    CommonModule,
    InfoRoutingModule
  ]
})
export class InfoModule { }
