import { GroupDetail } from 'src/app/interaces/GroupDetails';
import { activeEcpsGroupMembers, activeEpsGroupMembers, previousEcpsGroupMembers, previousEpsGroupMembers } from './GroupMember';
import { groupLeaders } from './GroupLeaders';

const present = new Date();
const epsStartDate = new Date(present.getFullYear()-1, 10, 8);
const ecpsStartDate = new Date(present.getFullYear()-1, 8, 23);
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
    groupName: 'Hartford Wealth Circle',
    groupLocation: 'Hartford, CT',
    payoutSystem: 'EPS',
    savingsTarget: 10000,
    contribution: 500,
    frequency: 'Bi',
    groupSize: 10,
    rank: 8,
    nextContributionDate: getBINextContributionDate(epsStartDate),
    startDate: epsStartDate,
    endDate: getEPSendDate(epsStartDate),
    isActive: true,
    groupMembers: activeEpsGroupMembers,
    groupLeader: groupLeaders[5],
    cycle: 2
  },
  {
    groupName: 'Hartford Savings Builders',
    groupLocation: 'Hartford, CT',
    payoutSystem: 'ECPS',
    savingsTarget: 10000,
    contribution: 500,
    frequency: 'Bi',
    groupSize: 10,
    rank: 'n/a',
    nextContributionDate: getBINextContributionDate(ecpsStartDate),
    startDate: ecpsStartDate,
    endDate: calculateECPSendDate(),
    isActive: true,
    groupMembers: activeEcpsGroupMembers,
    groupLeader: groupLeaders[4],
    cycle: 3
  },
  {
    groupName: 'Hartford Trust Alliance',
    groupLocation: 'Hartford, CT',
    payoutSystem: 'EPS',
    savingsTarget: 7000,
    contribution: 1000,
    frequency: 'Mo',
    groupSize: 7,
    rank: 1,
    nextContributionDate: null,
    startDate: new Date(2021, 1, 24),
    endDate: new Date(2022, 7, 24),
    isActive: false,
    groupMembers: previousEpsGroupMembers,
    groupLeader: groupLeaders[3],
    cycle: 1
  },
  {
    groupName: 'Hartford Heritage Union',
    groupLocation: 'Hartford, CT',
    payoutSystem: 'ECPS',
    savingsTarget: 5000,
    groupSize: 10,
    rank: 'n/a',
    nextContributionDate: null,
    startDate: new Date(2021, 10, 25),
    contribution: 500,
    frequency: 'Bi',
    endDate: new Date(2022, 2, 12),
    isActive: false,
    groupMembers: previousEcpsGroupMembers,
    groupLeader: groupLeaders[2],
    cycle: 1
  },
];
