import { Component } from '@angular/core';
import { ContentManagerService } from 'src/app/services/content-manager/content-manager.service';
import { ScreenLayoutService } from 'src/app/utils/screen-layout/screen-layout.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent {
  privacyPolicy: any;
  isMobile = true;

  constructor(private contentManagerService: ContentManagerService, private screenService: ScreenLayoutService){
    this.contentManagerService.getPrivacyPolicy().subscribe(
      (data) => {
        this.privacyPolicy = data;
      }
    );
    this.screenService.isMobile$.subscribe(
      isMobile =>{
        this.isMobile = isMobile;
      }
    );
  }

  closeBottomSheet(){
    if(!this.isMobile) return;
    this.contentManagerService.closeBottomSheet();
  }
}
