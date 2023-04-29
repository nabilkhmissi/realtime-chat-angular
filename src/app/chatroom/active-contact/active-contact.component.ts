import { Component, OnInit } from '@angular/core';
import { combineLatest, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { MessageServcie } from 'src/app/service/message.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-active-contact',
  templateUrl: './active-contact.component.html',
  styleUrls: ['./active-contact.component.css']
})
export class ActiveContactComponent implements OnInit {

  constructor(private chatService: MessageServcie,
    private authService: AuthService,
    private userService: UserService) { };
  isFriend = false;

  selectedUser$ = this.chatService.selectdUser$;
  authUser$ = this.authService.authUser$;

  isFriend$ = combineLatest([this.selectedUser$, this.userService.activeUserFriends$]).pipe(
    tap(([selectedUser, friends]) => {
      if (selectedUser) {
        if (friends.includes(selectedUser)) {
          this.isFriend = true;
        }
      }
    }),
    map(() => {
      return this.isFriend
    })
  );


  ngOnInit(): void {
  }

  logout() {
    this.authService.logout()
  }

  addFriend() {
    this.userService.addFriend().subscribe();
    this.isFriend = !this.isFriend
  }

}
