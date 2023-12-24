import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { TitleBodyArrayType } from 'src/app/interaces/TitleBodyArrayType';
import { ContentManagerService } from 'src/app/services/content-manager/content-manager.service';

@Component({
  selector: 'app-concept-overview',
  templateUrl: './concept-overview.component.html',
  styleUrls: ['./concept-overview.component.scss']
})
export class ConceptOverviewComponent implements OnInit{

  appLogo!: string;
  conceptOverview!: any;
  overviewImg = '/assets/img/phone-widget.webp';
  community = '/assets/img/community1.webp';
  eps = '/assets/img/eps.webp';
  ecps = '/assets/img/ecps.webp';
  leader = '/assets/img/leader.webp';
  communityEngagement = '/assets/img/community-engagement.webp';
  transparency = '/assets/img/transparency.webp';

  constructor(private contentManagerService: ContentManagerService, 
    private route: ActivatedRoute, private router: Router){
    this.appLogo = this.contentManagerService.getAppLogo3();
  }

  ngOnInit(): void {
    this.contentManagerService.getConceptOverview().subscribe(
      data => this.conceptOverview = data
    );
    this.scrollToSection();
  }

  scrollToSection(){
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      setTimeout(() => {
        this.route.fragment.subscribe(fragment => {
          if (fragment) {
            document.getElementById(fragment)?.scrollIntoView({ 
              behavior: 'smooth',
              block: "start",
              inline: "nearest" 
            });
          }
        });
      }, 150);
    });
  }

}
