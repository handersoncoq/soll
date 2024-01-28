import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ScreenLayoutService } from '../utils/screen-layout/screen-layout.service';
import { PaymentContainerComponent } from '../templates/payment-container/payment-container.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  isMobile = true;
  enterAnimationDuration = '400ms';
  exitAnimationDuration = '200ms';

  constructor(private _bottomSheet: MatBottomSheet, private dialog: MatDialog,
    private screenService: ScreenLayoutService,) { 
    this.screenService.isMobile$.subscribe(
      isMobile =>{
        this.isMobile = isMobile;
      }
  )}

  openPaymentContainer(): void {
    if(this.isMobile) {
      this._bottomSheet.open(PaymentContainerComponent, {
        panelClass: 'bottom-sheet-container'
      });
    }else{
      this.dialog.open(PaymentContainerComponent,
        {
          width: '100%',
          enterAnimationDuration: this.enterAnimationDuration,
          exitAnimationDuration: this.exitAnimationDuration,
        })
    }
  }

  closeBottomSheet(){
    this._bottomSheet.dismiss()
  }

}
