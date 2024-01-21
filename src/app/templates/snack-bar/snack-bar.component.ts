import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { ContentManagerService } from 'src/app/services/content-manager/content-manager.service';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent {

  appLogo = '';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, 
  private snackBarRef: MatSnackBarRef<SnackBarComponent>, private contentManagerService: ContentManagerService
  ) { 
    this.appLogo = this.contentManagerService.getAppLogoDark();
  }

  closeSnackbar(){
    this.snackBarRef.dismiss();
  }

  performAction(){
    this.data.learnMore();
    this.closeSnackbar();
  }

  getIconName(type: string): string {
    switch (type) {
      case 'success': return 'check';
      case 'warn': return 'info';
      case 'error': return 'error';
      default: return '';
    }
  }

}
