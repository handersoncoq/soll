export interface Community {
    communityName: string;
    type: 'Open' | 'Closed';
    interest: string;
    memberCount: number;
    activeSince: Date;
    weeklyPostsCount: number;
  }  