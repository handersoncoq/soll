import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { InfoDetails } from 'src/app/interaces/Info';
import { ContentManagerService } from 'src/app/services/content-manager/content-manager.service';
import { ScreenLayoutService } from 'src/app/utils/screen-layout/screen-layout.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  privacyPolicy = false;
  termsAndConditions = false;
  infoDetails!: InfoDetails;
  enterAnimationDuration = '400ms';
  exitAnimationDuration = '200ms';

  isMobile$: Observable<boolean>;
  currentYear: number = new Date().getFullYear();

  constructor(
    private contentManagerService: ContentManagerService,
    private screenLayoutService: ScreenLayoutService
  ) {
    this.isMobile$ = this.screenLayoutService.isMobile$;
    this.contentManagerService
      .getInfo()
      .subscribe((details) => (this.infoDetails = details));
  }

  openPrivacyPolicy(): void {
    this.contentManagerService.openPrivacyPolicy();
  }

  openTermsAndConditions(): void {
    this.contentManagerService.openTermsAndConditions();
  }
}
