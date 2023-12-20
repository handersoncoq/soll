import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoDetails } from 'src/app/interaces/Info';
import { ContentManagerService } from 'src/app/services/content-manager/content-manager.service';
import { DialogueComponent } from 'src/app/templates/dialogue/dialogue.component';
import { PrivacyPolicyComponent } from 'src/app/templates/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from 'src/app/templates/terms-and-conditions/terms-and-conditions.component';

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
    this.dialog.open(PrivacyPolicyComponent,
      {
        width: '100%',
        enterAnimationDuration: this.enterAnimationDuration,
        exitAnimationDuration: this.exitAnimationDuration,
      })
  }

  openTermsAndConditions(): void {
    this.dialog.open(TermsAndConditionsComponent,
      {
        width: '100%',
        enterAnimationDuration: this.enterAnimationDuration,
        exitAnimationDuration: this.exitAnimationDuration,
      })
  }

  openContactDialog(): void {
    this.dialog.open(DialogueComponent, {
      data: {
        title: this.infoDetails.inquireTitle,
        content: this.infoDetails.phoneNumber,
        copiable: true,
        width: '100%',
      },
    });
  }

}
