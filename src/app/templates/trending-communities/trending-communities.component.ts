import { Component, Input } from '@angular/core';
import { Community } from 'src/app/interaces/Community';

@Component({
  selector: 'app-trending-communities',
  templateUrl: './trending-communities.component.html',
  styleUrl: './trending-communities.component.scss'
})
export class TrendingCommunitiesComponent {

  @Input() trendingCommunity!: Community;
}
