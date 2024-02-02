import { Component, Input } from '@angular/core';
import { ChatMessage } from 'src/app/interaces/ChatMessage';
import { User } from 'src/app/interaces/User';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss'
})
export class ChatMessageComponent {

  @Input() message!: ChatMessage;
  currentUser: User;

  constructor(private userSerice: UserService){
    this.currentUser = this.userSerice.getCurrentUser();
  }

}
