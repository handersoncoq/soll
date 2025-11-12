import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { GetStartedComponent } from './components/get-started/get-started.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { GroupDashboardComponent } from './components/group-dashboard/group-dashboard.component';
import { GroupProfileComponent } from './components/group-profile/group-profile.component';
import { GroupCatalogueComponent } from './components/group-catalogue/group-catalogue.component';
import { AuthComponent } from './components/auth/auth.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then((m) => m.InfoModule),
  },
  { path: '', component: FrontPageComponent },
  { path: 'auth', component: AuthComponent },
  // { path: 'get-started', component: GetStartedComponent},
  // { path: 'sign-in', component: SignInComponent},
  // { path: 'my-dashboard', component: UserDashboardComponent},
  // { path: 'group/:groupName/cycle/:cycleNumber/dashboard', component: GroupDashboardComponent },
  // { path: 'group/:groupName/profile', component: GroupProfileComponent },
  // { path: 'join-a-group', component: GroupCatalogueComponent },

  { path: '**', component: NotFoundComponent },
];

const routerOptions: ExtraOptions = {
  onSameUrlNavigation: 'reload',
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 0],
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
