import { Group } from "src/app/interaces/Group";

export const prevGroups: Group[] = [
    {
      groupName: 'HAR-EPS-20230929-07',
      payoutSystem: 'EPS',
      savingsTarget: 7000,
      groupSize: 7,
      cycleStartDate: new Date(2020, 10, 24),
      contribution: '$1000/MO',
      endDate: new Date(2021, 7, 24)
    },
    {
      groupName: 'HAR-ECPS-20230929-03',
      payoutSystem: 'ECPS',
      savingsTarget: 5000,
      groupSize: 10,
      cycleStartDate: new Date(2020, 10, 25),
      contribution: '$500/BI',
      endDate: new Date(2021, 2, 12)
    },
  ];
  