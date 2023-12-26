import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatStepperModule} from '@angular/material/stepper';

import { PublicNavComponent } from '../templates/public-nav/public-nav.component';
import { LazyLoadingDirective } from '../utils/directives/lazy-loading.directive';
import { LazyLoadTextDirective } from '../utils/directives/lazy-load-text.directive';
import { PublicInteractionService } from '../services/public-interaction/public-interaction.service';
import { ScrollToSectionDirective } from '../utils/directives/scroll-to-section.directive';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';


@NgModule({
  declarations: [ 
    PublicNavComponent, LazyLoadingDirective, ScrollToSectionDirective,
    LazyLoadTextDirective]
    ,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatDividerModule,
    MatBottomSheetModule,
    MatStepperModule
  ],
  providers: [
    PublicInteractionService,
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
  exports: [ 
    PublicNavComponent, 
    LazyLoadingDirective,
    LazyLoadTextDirective,
    MatDialogModule, 
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatBottomSheetModule,
    MatStepperModule
  ]
})
export class SharedModule { }
