import { Group } from "src/app/interaces/Group";

let present = new Date();
let daysfromTody1 = 10;
let daysfromTody2 = 25;
let daysfromTody3 = 35;
let daysfromTody4 = 40;
let daysfromTody5 = 45;

export const trendingGroups: Group[] = [
    {
      groupName: 'LEX-EPS-20230929-01',
      payoutSystem: 'EPS',
      savingsTarget: 10000,
      groupSize: 10,
      startDate: new Date(present.getTime() + (daysfromTody1 * 24 * 60 * 60 * 1000)),
      contribution: '$500/BI',
      nextContribution: null,
      endDate: new Date()
    },
    {
      groupName: 'NYC-EPS-20230929-04',
      payoutSystem: 'EPS',
      savingsTarget: 15000,
      groupSize: 15,
      startDate: new Date(present.getTime() + (daysfromTody2 * 24 * 60 * 60 * 1000)),
      contribution: '$700/BI',
      nextContribution: null,
      endDate: new Date()
    },
    {
      groupName: 'BOS-ECPS-20230929-03',
      payoutSystem: 'ECPS',
      savingsTarget: 20000,
      groupSize: 8,
      startDate: new Date(present.getTime() + (daysfromTody3 * 24 * 60 * 60 * 1000)),
      contribution: '$1000/MO',
      nextContribution: null,
      endDate: new Date()
    },
    {
      groupName: 'PHI-EPS-20230929-07',
      payoutSystem: 'EPS',
      savingsTarget: 12000,
      groupSize: 12,
      startDate: new Date(present.getTime() + (daysfromTody4 * 24 * 60 * 60 * 1000)),
      contribution: '$500/BI',
      nextContribution: null,
      endDate: new Date()
    },
    {
      groupName: 'CHI-ECPS-20230929-05',
      payoutSystem: 'ECPS',
      savingsTarget: 18000,
      groupSize: 20,
      startDate: new Date(present.getTime() + (daysfromTody5 * 24 * 60 * 60 * 1000)),
      contribution: '$1000/MO',
      nextContribution: null,
      endDate: new Date()
    },
  ];
  