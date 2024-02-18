import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
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
export class GroupChatComponent implements OnInit, AfterViewInit{
  @ViewChild('chatContent') chatContent!: ElementRef;

  isMobile = true;
  group!: Group;
  currentUser: User;

  messages: ChatMessage[] = [];
  newMessage: string = '';
  pinnedMessage: ChatMessage | undefined;
  showPinnedMessage = false;

  constructor(private screenService: ScreenLayoutService, private groupService: GroupService,
    private chatService: ChatService, private userService: UserService, private renderer: Renderer2){
    this.screenService.isMobile$.subscribe(
      isMobile =>{
        this.isMobile = isMobile;
      });
      this.currentUser = this.userService.getCurrentUser();
    }


  ngOnInit(): void {
    this.group = this.groupService.foundGroup;
  }

  ngAfterViewInit() {
    this.initChat();
    this.scrollToLastMessage();
    this.onScroll();
  }

  initChat() {
    this.messages = this.chatService.getGroupMessages(this.group);
    this.getPinnedMessage();
  }


  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messages.push({
        text: this.newMessage,
        own: true,
        timestamp: new Date(),
        sender: this.currentUser,
      });
      this.newMessage = '';
      requestAnimationFrame(() => {
        this.scrollToLastMessage();
      });
    }
  }

  scrollToLastMessage(): void {
    const messageElements = document.querySelectorAll('.message'); // Use an appropriate class name
    const lastMessage = messageElements[messageElements.length - 1];
    if (lastMessage) {
      lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }

  // get pinned message from message list
  getPinnedMessage(){
    this.pinnedMessage = this.messages.find((message) => message.pinned);
  }

  onScroll() {
    this.renderer.listen(this.chatContent.nativeElement, 'scroll', (event) => {
      // Logic to show/hide pinned message
      if (event.target.scrollTop > 10) {
        this.showPinnedMessage = true;
      } else {
        this.showPinnedMessage = false;
      }
      console.log('Scroll event captured');
    });
  }

  closeBottomSheet(){
    this.chatService.closeBottomSheet();
  }
}
