import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../models/user.model';
import { MessageServcie } from '../service/message.service';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor(private userService: UserService,
    private chatService: MessageServcie) { }

  selectedUser!: User;
  search = new FormControl();
  usersFound$!: User[];
  showSearchResults = false;
  friends$ = this.userService.activeUserFriends$;

  ngOnInit(): void {
    this.userService.loadActiveUserFriends()
    this.search.valueChanges.pipe(
      switchMap(name => {
        if (name) {
          return this.userService.getUsersSearch(name);
        }
        return of([]);
      })
    ).subscribe(
      users => {
        this.usersFound$ = users;
        this.showSearchResults = true;
      }
    );
    this.chatService.selectdUser$.subscribe(
      user => {
        if (user) {
          this.selectedUser = user
        }
      }
    )
  }

  selectUser(user: User) {
    this.chatService.selectedUserSubject.next(user);
    this.chatService.joinRoom().subscribe();
    this.showSearchResults = false;
  }


}
