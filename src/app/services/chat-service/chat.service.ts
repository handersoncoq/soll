import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ChatMessage } from 'src/app/interaces/ChatMessage';
import { Group } from 'src/app/interaces/Group';
import { GroupChatComponent } from 'src/app/templates/group-chat/group-chat.component';
import { activeGroupMessages, previousGroupMessages } from 'src/app/utils/constants/GroupMessages';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messages: ChatMessage[] = [];
  groupLeaderMsg: string = 'Welcome to the group chat. Please follow the rules!';

  constructor(private _bottomSheet: MatBottomSheet) { }

  openMobileGroupChat(): void {
    this._bottomSheet.open(GroupChatComponent, {
      panelClass: 'bottom-sheet-container'
    });
  }

  // get active group chat messages
  getActiveGroupMessages(): ChatMessage[] {
    return activeGroupMessages;
  }

  // get previous group chat messages
  getPreviousGroupMessages(): ChatMessage[] {
    return previousGroupMessages;
  }

  getGroupMessages(group: Group): ChatMessage[] {
    const currentGroupMembers = group.groupMembers;
    if (group.isActive) {
      this.messages = this.getActiveGroupMessages().filter(message => {
        return currentGroupMembers.some(member => member.name === message.sender.firstName + ' ' + message.sender.lastName);
      });

    } else {
      // find previous group messages from the chat service and filter out messages from the current group members and push them to the messages array
      this.messages = this.getPreviousGroupMessages().filter(message => {
        return currentGroupMembers.some(member => member.name === message.sender.firstName + ' ' + message.sender.lastName);
      });
    }
    this.messages.push(this.getLeaderMessage(group));
    this.orderMessages();
    return this.messages;
  }

  getLeaderMessage(group: Group): ChatMessage {
    return {
      text: this.groupLeaderMsg,
      own: false,
      sender: group.groupLeader,
      timestamp: group.startDate,
      pinned: true,
      fromGroupLeader: true
    }
  }

  orderMessages(): void {
    this.messages.sort((a, b) => {
      return a.timestamp.getTime() - b.timestamp.getTime();
    });
  }

  closeBottomSheet(){
    this._bottomSheet.dismiss()
  }
}
