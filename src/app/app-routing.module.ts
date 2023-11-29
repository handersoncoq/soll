import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { GetStartedComponent } from './components/get-started/get-started.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then(m => m.InfoModule)
  },
  { path: '', component: FrontPageComponent},
  { path: 'get-started', component: GetStartedComponent},
  { path: 'login', component: LoginComponent},

  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
