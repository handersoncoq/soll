import { ChatMessage } from "src/app/interaces/ChatMessage";
import { activeEpsGroupMembers, previousEpsGroupMembers } from "./GroupMember";
import { User } from "src/app/interaces/User";
import { userGroups } from "./UserGroupDetail";

// Export an array of ChatMessage objects

const activeSender1: User = {
    firstName: activeEpsGroupMembers[2].name.split(' ')[0],
    lastName: activeEpsGroupMembers[2].name.split(' ')[1],
    address: '',
    reputationScore: activeEpsGroupMembers[0].reputationScore,
    };

const activeSender2: User = {
    firstName: activeEpsGroupMembers[4].name.split(' ')[0],
    lastName: activeEpsGroupMembers[4].name.split(' ')[1],
    address: '',
    reputationScore: activeEpsGroupMembers[1].reputationScore,
    };

const previousSender1: User = {
    firstName: previousEpsGroupMembers[3].name.split(' ')[0],
    lastName: previousEpsGroupMembers[3].name.split(' ')[1],
    address: '',
    reputationScore: previousEpsGroupMembers[1].reputationScore,
};

export const activeGroupMessages: ChatMessage[] = [
  {
    text: 'Hello, everyone!',
    own: false,
    timestamp: new Date(Date.now() - 604800000),
    sender: activeSender1,
    fromGroupLeader: false
  },

  {
    text: 'Do we have a meeting this weekend?',
    own: false,
    timestamp: new Date(Date.now() - 86400000),
    sender: activeSender2,
    fromGroupLeader: false
  },
 
];

// Export an array of ChatMessage objects of previous group members

export const previousGroupMessages: ChatMessage[] = [
  {
    text: `Hello, everyone! I'm new here. Can someone tell me how this works?`,
    own: false,
    // timestanmp is 3 days after the start date of the previous group
    timestamp: new Date(userGroups[2].startDate.getTime() + 3 * 24 * 60 * 60 * 1000),
    sender: previousSender1,
    fromGroupLeader: false
  },
];