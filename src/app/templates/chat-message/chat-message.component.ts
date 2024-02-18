import { Component, Input } from '@angular/core';
import { ChatMessage } from 'src/app/interaces/ChatMessage';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss'
})
export class ChatMessageComponent{

  @Input() message!: ChatMessage;

  constructor(){}

  // Pin and unpin the message
  togglePin(){
    this.message.pinned = !this.message.pinned;
  }

  // Get the sender's full name
  getSenderName(){
    return this.message.sender.firstName + ' ' + this.message.sender.lastName;
  }

}
