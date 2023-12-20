import { Component } from '@angular/core';
import { ContentManagerService } from 'src/app/services/content-manager/content-manager.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent {
  
  termsAndConditions: any;

  constructor(private contentManagerService: ContentManagerService){
    this.contentManagerService.getTermsAndConditions().subscribe(
      (data) => {
        this.termsAndConditions = data;
      }
    )
  }
}
