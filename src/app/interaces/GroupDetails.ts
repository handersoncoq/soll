import { GroupLeader } from "./GroupLeader";
import { GroupMember } from "./GroupMember";

export interface GroupDetail {
    groupName: string;
    groupLocation: string,
    payoutSystem: string;
    savingsTarget: number;
    contribution: number,
    frequency: string,
    groupSize: number;
    rank: any;
    nextContributionDate: any;
    startDate: Date;
    endDate: Date,
    isActive: boolean,
    groupMembers: GroupMember[],
    groupLeader: GroupLeader
  }