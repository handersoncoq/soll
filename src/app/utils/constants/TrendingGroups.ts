import { Group } from "src/app/interaces/Group";

let present = new Date();

export const trendingGroups: Group[] = [
    {
      groupName: 'LEX-EPS-20230929-01',
      payoutSystem: 'EPS',
      savingsTarget: 10000,
      groupSize: 10,
      cycleStartDate: new Date(present.getFullYear(), 10, 23),
      contribution: '$500/BI',
      endDate: new Date()
    },
    {
      groupName: 'NYC-EPS-20230929-04',
      payoutSystem: 'EPS',
      savingsTarget: 15000,
      groupSize: 15,
      cycleStartDate: new Date(present.getFullYear(), 10, 24),
      contribution: '$700/BI',
      endDate: new Date()
    },
    {
      groupName: 'BOS-ECPS-20230929-03',
      payoutSystem: 'ECPS',
      savingsTarget: 20000,
      groupSize: 8,
      cycleStartDate: new Date(present.getFullYear(), 10, 25),
      contribution: '$1000/MO',
      endDate: new Date()
    },
    {
      groupName: 'PHI-EPS-20230929-07',
      payoutSystem: 'EPS',
      savingsTarget: 12000,
      groupSize: 12,
      cycleStartDate: new Date(present.getFullYear(), 10, 26),
      contribution: '$500/BI',
      endDate: new Date()
    },
    {
      groupName: 'CHI-ECPS-20230929-05',
      payoutSystem: 'ECPS',
      savingsTarget: 18000,
      groupSize: 20,
      cycleStartDate: new Date(present.getFullYear(), 10, 27),
      contribution: '$1000/MO',
      endDate: new Date()
    },
  ];
  