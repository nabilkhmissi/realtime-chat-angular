import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { AuthService } from 'src/app/service/auth.service';
import { MessageServcie } from 'src/app/service/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private chatService: MessageServcie,
    private authService: AuthService) { }

  activeUser$ = this.authService.authUser$;
  messages: Message[] = [];
  isTyping$ = this.chatService.typing$;
  ngOnInit(): void {
    this.chatService.getUserIsTyping().subscribe()
    this.chatService.joindRoomMessages$.subscribe(
      messages => {
        this.messages = messages;
        window.scrollTo(0, document.body.scrollHeight);
      }
    )
    this.chatService.getJoinedRoom();
    this.chatService.getNewMessage().subscribe(message => {
      if (message) {
        this.messages.push(message);
        window.scrollTo(0, document.body.scrollHeight);
      }
    });
  }

}
