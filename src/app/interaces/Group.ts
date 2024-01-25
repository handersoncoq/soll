import { GroupLeader } from "./GroupLeader"
import { GroupMember } from "./GroupMember"

export interface Group {
    groupName: string,
    groupLocation: string,
    payoutSystem: string,
    savingsTarget: number,
    groupSize: number,
    startDate: Date,
    contribution: number,
    frequency: string,
    nextContribution: Date | null,
    endDate: Date,
    isActive: boolean,
    groupMembers: GroupMember[],
    groupLeader: GroupLeader,
    minReputationScore: number,
    cycle: number
  }