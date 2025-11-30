import { Component, EventEmitter, Output } from '@angular/core';
import { ContentManagerService } from 'src/app/services/content-manager/content-manager.service';
import { ScreenLayoutService } from 'src/app/utils/screen-layout/screen-layout.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent {
  @Output() closed = new EventEmitter<boolean>();
  termsAndConditions: any;
  isMobile = true;

  constructor(
    private contentManagerService: ContentManagerService,
    private screenService: ScreenLayoutService
  ) {
    this.contentManagerService.getTermsAndConditions().subscribe((data) => {
      this.termsAndConditions = data;
    });
    this.screenService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }

  closeBottomSheet() {
    if (!this.isMobile) return;
    this.contentManagerService.closeBottomSheet();
    this.closed.emit(true);
  }

  closeDialog() {
    if (!this.isMobile) {
      this.closed.emit(true);
    }
  }
}
