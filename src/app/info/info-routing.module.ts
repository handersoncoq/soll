import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConceptOverviewComponent } from './components/concept-overview/concept-overview.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { FeedbackComponent } from './components/feedback/feedback.component';


const routes: Routes = [
  { path: 'concept-overview', component: ConceptOverviewComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'feedback', component: FeedbackComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoRoutingModule { }
