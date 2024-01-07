import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, 
  private snackBarRef: MatSnackBarRef<SnackBarComponent>
  ) { }

  closeSnackbar(){
    this.snackBarRef.dismiss();
  }

  getIconName(type: string): string {
    switch (type) {
      case 'success': return 'check_circle';
      case 'warn': return 'info';
      case 'error': return 'error';
      default: return '';
    }
  }

}
