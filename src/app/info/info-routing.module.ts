import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConceptOverviewComponent } from './components/concept-overview/concept-overview.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HelpMeComponent } from './components/help-me/help-me.component';
import { InquireComponent } from './components/inquire/inquire.component';


const routes: Routes = [
  { path: 'concept-overview', component: ConceptOverviewComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'help-me', component: HelpMeComponent },
  { path: 'inquire', component: InquireComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoRoutingModule { }
