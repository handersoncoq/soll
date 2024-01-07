import { GroupDetail } from 'src/app/interaces/GroupDetails';
import { activeEcpsGroupMembers, activeEpsGroupMembers, previousEcpsGroupMembers, previousEpsGroupMembers } from './GroupMembers';
import { groupLeaders } from './GroupLeaders';

const present = new Date();
const epsStartDate = new Date(present.getFullYear()-1, 9, 30);
const ecpsStartDate = new Date(present.getFullYear()-1, 7, 23);
const groupSize = 10;

const ecpsSavingsTarget = 10000; 
const ecpsContributionAmount = 500;
const frequency = 14;

function getEPSendDate(startDate: Date): Date {
  const initialDelay = 4 * 7 * 24 * 60 * 60 * 1000;
  const totalPayoutDuration = groupSize * 2 * 7 * 24 * 60 * 60 * 1000;
  const endDate = new Date(startDate.getTime() + initialDelay + totalPayoutDuration);

  return endDate;
}

function calculateECPSendDate(): Date {
  const totalContributionsNeeded = Math.ceil(ecpsSavingsTarget / ecpsContributionAmount);
  const oneContributionPeriod = frequency * 24 * 60 * 60 * 1000;
  const endDate = new Date(ecpsStartDate.getTime() + oneContributionPeriod * (totalContributionsNeeded - 1));
  return endDate;
}

function getBINextContributionDate(startDate: Date): Date {
  startDate.setHours(0, 0, 0, 0);
  present.setHours(0, 0, 0, 0);
  const oneDay = 24 * 60 * 60 * 1000;
  const daysSinceStart = Math.floor((present.getTime() - startDate.getTime()) / oneDay);
  const contributionInterval = 14;
  const cyclesPassed = Math.floor(daysSinceStart / contributionInterval);
  const nextContributionDate = new Date(startDate.getTime() + ((cyclesPassed + 1) * contributionInterval * oneDay));
  return nextContributionDate;
}

export const userGroups: GroupDetail[] = [
  {
    groupName: 'HAR-EPS-20230929-01',
    payoutSystem: 'EPS',
    savingsTarget: 10000,
    contribution: '$500/BI',
    groupSize: 10,
    rank: 5,
    nextContributionDate: getBINextContributionDate(epsStartDate),
    startDate: epsStartDate,
    endDate: getEPSendDate(epsStartDate),
    isActive: true,
    groupMembers: activeEpsGroupMembers,
    groupLeader: groupLeaders[5]
  },
  {
    groupName: 'HAR-ECPS-20231212-04',
    payoutSystem: 'ECPS',
    savingsTarget: 10000,
    contribution: '$500/BI',
    groupSize: 10,
    rank: 'n/a',
    nextContributionDate: getBINextContributionDate(ecpsStartDate),
    startDate: ecpsStartDate,
    endDate: calculateECPSendDate(),
    isActive: true,
    groupMembers: activeEcpsGroupMembers,
    groupLeader: groupLeaders[4]
  },
  {
    groupName: 'HAR-EPS-20230929-07',
    payoutSystem: 'EPS',
    savingsTarget: 7000,
    contribution: '$1000/MO',
    groupSize: 7,
    rank: 1,
    nextContributionDate: null,
    startDate: new Date(2020, 10, 24),
    endDate: new Date(2021, 7, 24),
    isActive: false,
    groupMembers: previousEpsGroupMembers,
    groupLeader: groupLeaders[3]
  },
  {
    groupName: 'HAR-ECPS-20230929-03',
    payoutSystem: 'ECPS',
    savingsTarget: 5000,
    groupSize: 10,
    rank: 'n/a',
    nextContributionDate: null,
    startDate: new Date(2020, 10, 25),
    contribution: '$500/BI',
    endDate: new Date(2021, 2, 12),
    isActive: false,
    groupMembers: previousEcpsGroupMembers,
    groupLeader: groupLeaders[2]
  },
];
