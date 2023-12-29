import { GroupDetail } from 'src/app/interaces/GroupDetails';

let present = new Date();

export const userGroups: GroupDetail[] = [
  {
    groupName: 'HAR-EPS-20230929-01',
    payoutSystem: 'EPS',
    savingsTarget: 10000,
    contribution: '$500/BI',
    groupSize: 10,
    rank: 4,
    nextContributionDate: new Date(
      present.getFullYear(),
      present.getMonth(),
      present.getDate() + 15
    ),
    cycleStartDate: new Date(present.getFullYear(), 10, 23),
    frequency: 30,
  },
  {
    groupName: 'HAR-EPS-20231212-04',
    payoutSystem: 'ECPS',
    savingsTarget: 10000,
    contribution: '$500/BI',
    groupSize: 10,
    rank: 7,
    nextContributionDate: new Date(
      present.getFullYear(),
      present.getMonth(),
      present.getDate() + 30
    ),
    cycleStartDate: new Date(present.getFullYear(), 10, 23),
    frequency: 30,
  },
];
