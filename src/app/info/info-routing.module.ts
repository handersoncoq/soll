import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { DocsLayoutComponent } from './components/docs-layout/docs-layout.component';
import { DocViewerComponent } from './components/doc-viewer/doc-viewer.component';

const routes: Routes = [
  {
    path: '',
    component: DocsLayoutComponent,
    children: [
      { path: '', component: DocViewerComponent },
      { path: ':slug', component: DocViewerComponent },
    ],
  },
  // { path: 'concept-overview', component: ConceptOverviewComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'feedback', component: FeedbackComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoRoutingModule {}
