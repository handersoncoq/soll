export interface GroupDetail {
    groupName: string;
    payoutSystem: string;
    savingsTarget: number;
    nextContributionAmount: number;
    groupSize: number;
    rank: number;
    nextContributionDate: Date;
    cycleStartDate: Date;
    frequency: number;
  }