import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { MessageServcie } from "./message.service";
import { AuthService } from "./auth.service";
import { BehaviorSubject, map, switchMap, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient,
        private chatService: MessageServcie,
        private authService: AuthService) { }


    baseUrl = 'https://talkywalky.onrender.com/api';

    activeUserFriendsSubject = new BehaviorSubject<User[]>([]);
    activeUserFriends$ = this.activeUserFriendsSubject.asObservable();

    selectedUser$ = this.chatService.selectdUser$;
    authUser$ = this.authService.authUser$;

    getActiveUserFriends() {
        return this.authUser$.pipe(
            switchMap(authUser => {
                return this.http.get<User[]>(`${this.baseUrl}/users/friends/${authUser._id}`).pipe(
                    tap(users => {
                        this.activeUserFriendsSubject.next(users)
                    })
                )
            })
        )
    }

    loadActiveUserFriends() {
        this.getActiveUserFriends().subscribe();
    }
    addFriend() {
        return this.authUser$.pipe(
            switchMap(authUser => {
                return this.selectedUser$.pipe(
                    switchMap(selectedUser => {
                        return this.http.post<{ message: string }>(`${this.baseUrl}/users/addFriend`, { authUser, selectedUser }).pipe(
                            tap(() => this.loadActiveUserFriends())
                        )
                    })
                )
            })
        )
    }

    getUsersSearch(name: string) {
        return this.authService.authUser$.pipe(
            switchMap(authUser => {
                return this.http.get<User[]>(`${this.baseUrl}/users/search?name=${name}`).pipe(
                    map(users => {
                        return users.filter(user => user._id !== authUser._id)
                    })
                )
            })
        )
    }
    getById(id: string) {
        return this.http.get(`${this.baseUrl}/users/${id}`)
    }

    users$ = this.http.get<User[]>(this.baseUrl + '/users')
}