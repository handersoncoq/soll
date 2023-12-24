import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';

import { PublicNavComponent } from '../templates/public-nav/public-nav.component';
import { LazyLoadingDirective } from '../utils/directives/lazy-loading.directive';
import { LazyLoadTextDirective } from '../utils/directives/lazy-load-text.directive';
import { PublicInteractionService } from '../services/public-interaction/public-interaction.service';
import { ScrollToSectionDirective } from '../utils/directives/scroll-to-section.directive';


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
    MatDividerModule
  ],
  providers: [PublicInteractionService],
  exports: [ 
    PublicNavComponent, 
    LazyLoadingDirective,
    LazyLoadTextDirective,
    MatDialogModule, 
    MatToolbarModule,
    MatButtonModule
  ]
})
export class SharedModule { }
