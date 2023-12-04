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

import { AppComponent } from './app.component';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { ContentManagerService } from './services/content-manager/content-manager.service';
import { SharedModule } from './shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { GetStartedComponent } from './components/get-started/get-started.component';
import { LoginComponent } from './components/login/login.component';
import { SnackBarComponent } from './templates/snack-bar/snack-bar.component';
import { ScreenLayoutService } from './utils/screen-layout/screen-layout.service';
import { VerificationComponent } from './templates/verification/verification.component';
import { LoadingComponent } from './templates/loading/loading.component';
import { VideoPlayerComponent } from './templates/video-player/video-player.component';
import { DialogueComponent } from './templates/dialogue/dialogue.component';
import { PrivacyPolicyComponent } from './templates/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './templates/terms-and-conditions/terms-and-conditions.component';

@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    FooterComponent,
    GetStartedComponent,
    LoginComponent,
    SnackBarComponent,
    VerificationComponent,
    LoadingComponent,
    VideoPlayerComponent,
    DialogueComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
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
    MatTooltipModule
  ],
  providers: [ContentManagerService, ScreenLayoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
