import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';

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
import { LazyVideoDirective } from './utils/directives/lazy-video.directive';
import { StyleManagerService } from './services/style-manager/style-manager.service';
import { NoticeComponent } from './templates/notice/notice.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

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
    LazyVideoDirective,
    NoticeComponent,
    SignInComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
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
    MatDialogModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  providers: [ContentManagerService, ScreenLayoutService, StyleManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
