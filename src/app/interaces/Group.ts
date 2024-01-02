export interface Group {
    groupName: string,
    payoutSystem: string,
    savingsTarget: number,
    groupSize: number,
    startDate: Date,
    contribution: string,
    nextContribution: Date | null,
    endDate: Date
  }