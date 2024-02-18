import { GroupMember } from "./GroupMember"
import { User } from "./User"

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
    groupLeader: User,
    minReputationScore: number,
    cycle: number
  }