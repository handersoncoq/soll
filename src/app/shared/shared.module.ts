import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';

import { PublicNavComponent } from '../templates/public-nav/public-nav.component';
import { LazyLoadingDirective } from '../utils/directives/lazy-loading.directive';
import { LazyLoadTextDirective } from '../utils/directives/lazy-load-text.directive';


@NgModule({
  declarations: [ PublicNavComponent, LazyLoadingDirective, LazyLoadTextDirective ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule
  ],
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
