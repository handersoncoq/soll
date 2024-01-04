import { CUSTOM_ELEMENTS_SCHEMA, Injectable, NgModule } from '@angular/core';
import { BrowserModule, HammerModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { ContentManagerService } from './services/content-manager/content-manager.service';
import { SharedModule } from './shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { GetStartedComponent } from './components/get-started/get-started.component';
import { SnackBarComponent } from './templates/snack-bar/snack-bar.component';
import { ScreenLayoutService } from './utils/screen-layout/screen-layout.service';
import { VerificationComponent } from './templates/verification/verification.component';
import { LoadingComponent } from './templates/loading/loading.component';
import { DialogueComponent } from './templates/dialogue/dialogue.component';
import { PrivacyPolicyComponent } from './templates/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './templates/terms-and-conditions/terms-and-conditions.component';
import { StyleManagerService } from './services/style-manager/style-manager.service';
import { NoticeComponent } from './templates/notice/notice.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HowItWorksComponent } from './templates/how-it-works/how-it-works.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserNavComponent } from './templates/user-nav/user-nav.component';
import { TrendingGroupsComponent } from './templates/trending-groups/trending-groups.component';
import { PrevGroupsComponent } from './templates/prev-groups/prev-groups.component';
import { ActiveGroupsComponent } from './templates/active-groups/active-groups.component';
import { TrendingCommunitiesComponent } from './templates/trending-communities/trending-communities.component';
import { GroupDashboardComponent } from './components/group-dashboard/group-dashboard.component';
import { GroupCircleComponent } from './templates/group-circle/group-circle.component';
import { DashboardFooterComponent } from './templates/dashboard-footer/dashboard-footer.component';
import { GroupStatsComponent } from './templates/group-stats/group-stats.component';
import { GroupStrengthComponent } from './templates/group-strength/group-strength.component';


@Injectable()
export class HammerConfig extends HammerGestureConfig {
  override overrides = <any> { 
    swipe: { direction: Hammer.DIRECTION_ALL }, 
  };
}
@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    FooterComponent,
    GetStartedComponent,
    SnackBarComponent,
    VerificationComponent,
    LoadingComponent,
    DialogueComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    NoticeComponent,
    SignInComponent,
    HowItWorksComponent,
    UserDashboardComponent,
    UserNavComponent,
    TrendingGroupsComponent,
    PrevGroupsComponent,
    ActiveGroupsComponent,
    TrendingCommunitiesComponent,
    GroupDashboardComponent,
    GroupCircleComponent,
    DashboardFooterComponent,
    GroupStatsComponent,
    GroupStrengthComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    HttpClientModule,
    SharedModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
    HammerModule
  ],
  providers: [
    ContentManagerService, ScreenLayoutService, 
    StyleManagerService, 
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
