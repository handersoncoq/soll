import { GroupLeader } from "./GroupLeader"
import { GroupMember } from "./GroupMember"

export interface Group {
    groupName: string,
    payoutSystem: string,
    savingsTarget: number,
    groupSize: number,
    startDate: Date,
    contribution: string,
    nextContribution: Date | null,
    endDate: Date,
    isActive: boolean,
    groupMembers: GroupMember[],
    groupLeader: GroupLeader
  }