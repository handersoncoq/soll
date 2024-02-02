import { Component, OnInit } from '@angular/core';
import { ChatMessage } from 'src/app/interaces/ChatMessage';
import { Group } from 'src/app/interaces/Group';
import { User } from 'src/app/interaces/User';
import { ChatService } from 'src/app/services/chat-service/chat.service';
import { GroupService } from 'src/app/services/group-service/group.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { ScreenLayoutService } from 'src/app/utils/screen-layout/screen-layout.service';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrl: './group-chat.component.scss',
})
export class GroupChatComponent implements OnInit{

  isMobile = true;
  group: Group;
  currentUser: User;

  messages: ChatMessage[] = [];
  newMessage: string = '';
  own: boolean = true;
  timestamp = new Date();

  groupLeaderMsg!: ChatMessage;
  leaderMsg: string = 'Welcome to the group chat. Please follow the rules!';

  constructor(private screenService: ScreenLayoutService, private groupService: GroupService,
    private chatService: ChatService, private userService: UserService){
    this.screenService.isMobile$.subscribe(
      isMobile =>{
        this.isMobile = isMobile;
      });
      this.group = this.groupService.foundGroup;
      this.currentUser = userService.getCurrentUser();
    }

  ngOnInit(): void {
    this.groupLeaderMsg = {
      text: this.leaderMsg,
      own: false,
      senderName: this.group.groupLeader.name,
      timestamp: this.group.startDate,
      pinned: true,
      fromGroupLeader: true
    }
    this.messages.push(this.groupLeaderMsg);
  }

  closeBottomSheet(){
    this.chatService.closeBottomSheet();
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messages.push({
        text: this.newMessage,
        own: this.own,
        timestamp: this.timestamp,
        senderName: this.currentUser.firstName,
      });
      this.newMessage = '';
    }
  }
}
