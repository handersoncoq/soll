import { Group } from 'src/app/interaces/Group';
import { groupLeaders } from './GroupLeaders';
import {activeEcpsGroupMembers, fullGroupMembers} from './GroupMembers';

let present = new Date();
let daysfromTody1 = 10;
let daysfromTody2 = 25;
let daysfromTody3 = 35;
let daysfromTody4 = 40;
let daysfromTody5 = 45;

export const trendingGroups: Group[] = [
  {
    groupName: 'HAR-ECPS-20230929-11',
    payoutSystem: 'ECPS',
    savingsTarget: 10000,
    groupSize: 10,
    startDate: new Date(present.getTime() + daysfromTody1 * 24 * 60 * 60 * 1000),
    contribution: '$500/BI',
    nextContribution: null,
    isActive: false,
    endDate: new Date(present.getTime() + 200 * 24 * 60 * 60 * 1000),
    groupMembers: [
      activeEcpsGroupMembers[2],
      activeEcpsGroupMembers[7],
      activeEcpsGroupMembers[4],
      activeEcpsGroupMembers[8],
      activeEcpsGroupMembers[1],
      activeEcpsGroupMembers[0],
      activeEcpsGroupMembers[3]
    ],
    groupLeader: groupLeaders[1],
  },
  {
    groupName: 'HAR-EPS-20230929-05',
    payoutSystem: 'EPS',
    savingsTarget: 16000,
    groupSize: 10,
    startDate: new Date(
      present.getTime() + daysfromTody2 * 24 * 60 * 60 * 1000
    ),
    contribution: '$600/BI',
    nextContribution: null,
    isActive: false,
    endDate: new Date(present.getTime() + 250 * 24 * 60 * 60 * 1000),
    groupMembers: fullGroupMembers,
    groupLeader: groupLeaders[6],
  },
  {
    groupName: 'HAR-EPS-20230929-18',
    payoutSystem: 'EPS',
    savingsTarget: 15000,
    groupSize: 15,
    startDate: new Date(
      present.getTime() + daysfromTody2 * 24 * 60 * 60 * 1000
    ),
    contribution: '$700/BI',
    nextContribution: null,
    isActive: false,
    endDate: new Date(present.getTime() + 250 * 24 * 60 * 60 * 1000),
    groupMembers: [activeEcpsGroupMembers[2], activeEcpsGroupMembers[3]],
    groupLeader: groupLeaders[2],
  },
  {
    groupName: 'HAR-ECPS-20230929-13',
    payoutSystem: 'ECPS',
    savingsTarget: 20000,
    groupSize: 12,
    startDate: new Date(
      present.getTime() + daysfromTody3 * 24 * 60 * 60 * 1000
    ),
    contribution: '$1000/MO',
    nextContribution: null,
    isActive: false,
    endDate: new Date(present.getTime() + 270 * 24 * 60 * 60 * 1000),
    groupMembers: [activeEcpsGroupMembers[4], activeEcpsGroupMembers[1]],
    groupLeader: groupLeaders[3],
  },
  {
    groupName: 'HAR-EPS-20230929-27',
    payoutSystem: 'EPS',
    savingsTarget: 12000,
    groupSize: 7,
    startDate: new Date(
      present.getTime() + daysfromTody4 * 24 * 60 * 60 * 1000
    ),
    contribution: '$500/BI',
    nextContribution: null,
    isActive: false,
    endDate: new Date(present.getTime() + 290 * 24 * 60 * 60 * 1000),
    groupMembers: [activeEcpsGroupMembers[2]],
    groupLeader: groupLeaders[4],
  },
  {
    groupName: 'HAR-ECPS-20230929-45',
    payoutSystem: 'ECPS',
    savingsTarget: 18000,
    groupSize: 12,
    startDate: new Date(
      present.getTime() + daysfromTody5 * 24 * 60 * 60 * 1000
    ),
    contribution: '$1000/MO',
    nextContribution: null,
    isActive: false,
    endDate: new Date(present.getTime() + 310 * 24 * 60 * 60 * 1000),
    groupMembers: [
      activeEcpsGroupMembers[0],
      activeEcpsGroupMembers[1],
      activeEcpsGroupMembers[3],
      activeEcpsGroupMembers[2],
    ],
    groupLeader: groupLeaders[5],
  },
];
