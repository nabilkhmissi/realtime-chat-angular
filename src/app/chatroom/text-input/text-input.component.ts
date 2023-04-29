import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, tap } from 'rxjs';
import { Room } from 'src/app/models/room.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/service/auth.service';
import { MessageServcie } from 'src/app/service/message.service';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {

  constructor(private chatService: MessageServcie,
    private authService: AuthService) { }

  message = new FormControl('');
  activeUser!: User;
  joinedRoom!: string;
  ngOnInit(): void {

    this.message.valueChanges.pipe(
      tap(message => {
        this.scrollToBottom()
        if (message !== '') {
          this.chatService.typing({ roomId: this.joinedRoom, typer: this.activeUser._id, typing: true })
        } else {
          this.chatService.typing({ roomId: this.joinedRoom, typer: this.activeUser._id, typing: false })
        }
      })
    ).subscribe()


    this.authService.authUser$.subscribe(user => this.activeUser = user);
    this.chatService.joinedRoom$.subscribe(
      room => {
        if (room) {
          this.joinedRoom = room
        }
      }
    )
  }

  sendMessage() {
    let message = { sender: this.activeUser, content: this.message.value, roomId: this.joinedRoom };
    this.chatService.sendMessage(message)
    this.message.setValue('');
    this.scrollToBottom()
  }

  scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }

}
