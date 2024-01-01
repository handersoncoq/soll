import { GroupDetail } from 'src/app/interaces/GroupDetails';

const present = new Date();
const epsStartDate = new Date(present.getFullYear(), 9, 30);
const ecpsStartDate = new Date(present.getFullYear(), 7, 23);
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
  },
  {
    groupName: 'HAR-EPS-20231212-04',
    payoutSystem: 'ECPS',
    savingsTarget: 10000,
    contribution: '$500/BI',
    groupSize: 10,
    rank: 10,
    nextContributionDate: getBINextContributionDate(ecpsStartDate),
    startDate: ecpsStartDate,
    endDate: calculateECPSendDate(),
  },
];
