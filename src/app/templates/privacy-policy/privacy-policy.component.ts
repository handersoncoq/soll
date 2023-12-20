import { Component } from '@angular/core';
import { ContentManagerService } from 'src/app/services/content-manager/content-manager.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent {
  privacyPolicy: any;

  constructor(private contentManagerService: ContentManagerService){
    this.contentManagerService.getPrivacyPolicy().subscribe(
      (data) => {
        this.privacyPolicy = data;
      }
    )
  }
}
