import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoDetails } from 'src/app/interaces/Info';
import { ContentManagerService } from 'src/app/services/content-manager/content-manager.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  privacyPolicy = false;
  termsAndConditions = false;
  infoDetails!: InfoDetails;
  enterAnimationDuration = '400ms';
  exitAnimationDuration = '200ms';

  currentYear: number = new Date().getFullYear();

  constructor(private dialog: MatDialog, private contentManagerService: ContentManagerService){
    this.contentManagerService.getInfo().subscribe(
      (details) => this.infoDetails = details
    )
  }

  openPrivacyPolicy(): void {
    this.contentManagerService.openPrivacyPolicy()
  }

  openTermsAndConditions(): void {
    this.contentManagerService.openTermsAndConditions();
  }

}
