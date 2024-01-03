import { Group } from "src/app/interaces/Group";
import { previousEcpsGroupMembers, previousEpsGroupMembers } from "./GroupMembers";
import { GroupLeader } from "src/app/interaces/GroupLeader";
import { groupLeaders } from "./GroupLeaders";



export const prevGroups: Group[] = [
    {
      groupName: 'HAR-EPS-20230929-07',
      payoutSystem: 'EPS',
      savingsTarget: 7000,
      groupSize: 7,
      startDate: new Date(2020, 10, 24),
      contribution: '$1000/MO',
      nextContribution: null,
      endDate: new Date(2021, 7, 24),
      isActive: false,
      groupMembers: previousEpsGroupMembers,
      groupLeader: groupLeaders[0]
    },
    {
      groupName: 'HAR-ECPS-20230929-03',
      payoutSystem: 'ECPS',
      savingsTarget: 5000,
      groupSize: 10,
      startDate: new Date(2020, 10, 25),
      contribution: '$500/BI',
      nextContribution: null,
      endDate: new Date(2021, 2, 12),
      isActive: false,
      groupMembers: previousEcpsGroupMembers,
      groupLeader: groupLeaders[1]
    },
  ];
  