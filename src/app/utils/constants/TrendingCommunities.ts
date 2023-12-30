import { Community } from "src/app/interaces/Community";

export const trendingCommunities: Community[] = [
    {
      communityName: 'Tech Innovators',
      type: 'Closed',
      interest: 'Technology & Innovation',
      memberCount: 1500,
      activeSince: new Date(2018, 6, 10),
      weeklyPostsCount: 50
    },
    {
      communityName: 'Fitness & Health',
      type: 'Open',
      interest: 'Health & Wellness',
      memberCount: 950,
      activeSince: new Date(2020, 0, 1),
      weeklyPostsCount: 40
    },
    {
      communityName: 'World Travelers',
      type: 'Closed',
      interest: 'Travel & Cultures',
      memberCount: 1200,
      activeSince: new Date(2022, 5, 9),
      weeklyPostsCount: 60
    },
    {
      communityName: 'Artists Unite',
      type: 'Open',
      interest: 'Arts & Crafts',
      memberCount: 780,
      activeSince: new Date(2021, 10, 22),
      weeklyPostsCount: 25
    },
    {
      communityName: 'Urban Gardeners',
      type: 'Open',
      interest: 'Gardening & Sustainability',
      memberCount: 823,
      activeSince: new Date(2019, 3, 15),
      weeklyPostsCount: 30
    }
  ];
  