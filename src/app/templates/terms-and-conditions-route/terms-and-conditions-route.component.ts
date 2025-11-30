import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ScreenLayoutService } from 'src/app/utils/screen-layout/screen-layout.service';
import { TermsAndConditionsComponent } from '../terms-and-conditions/terms-and-conditions.component';

@Component({
  selector: 'app-terms-and-conditions-route',
  templateUrl: './terms-and-conditions-route.component.html',
  styleUrl: './terms-and-conditions-route.component.scss',
})
export class TermsAndConditionsRouteComponent implements OnInit {
  isMobile = true;
  enterAnimationDuration = '400ms';
  exitAnimationDuration = '200ms';

  constructor(
    private screenService: ScreenLayoutService,
    private _bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.screenService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }

  ngOnInit(): void {
    this.openTermsAndConditions();
  }

  openTermsAndConditions(): void {
    if (this.isMobile) {
      const ref = this._bottomSheet.open(TermsAndConditionsComponent, {
        panelClass: 'bottom-sheet-container',
      });

      ref.instance.closed.subscribe((value: boolean) => {
        this.handleBottomSheetClose(value);
        ref.dismiss();
      });
    } else {
      const dialogRef = this.dialog.open(TermsAndConditionsComponent, {
        width: '100%',
        enterAnimationDuration: this.enterAnimationDuration,
        exitAnimationDuration: this.exitAnimationDuration,
      });

      const instance = dialogRef.componentInstance;
      if (instance && instance.closed) {
        instance.closed.subscribe((value: boolean) => {
          this.handleBottomSheetClose(value);
          dialogRef.close();
        });
      }
    }
  }

  handleBottomSheetClose(closed: boolean) {
    if (closed) {
      this.router.navigate(['']);
    }
  }
}
