import { Injectable } from "@angular/core";
import { BehaviorSubject, EMPTY, Observable, Subject, combineLatest, concatMap, map, mergeMap, of, shareReplay, switchMap, tap } from "rxjs";
import { io } from "socket.io-client";
import { Message } from "../models/message.model";
import { Room } from "../models/room.model";
import { User } from "../models/user.model";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class MessageServcie {

    constructor(private authService: AuthService) {
    }
    socket = io('https://talkywalky.onrender.com');

    newMessageSubject = new Subject<Message>();
    newMessageSubject$ = this.newMessageSubject.asObservable();

    joinedRoomMessagesSubject = new BehaviorSubject<Message[]>([]);
    joindRoomMessages$ = this.joinedRoomMessagesSubject.asObservable();

    joinedRoomSubject = new BehaviorSubject<string | null>(null);
    joinedRoom$ = this.joinedRoomSubject.asObservable();

    selectedUserSubject = new BehaviorSubject<User | null>(null);
    selectdUser$ = this.selectedUserSubject.asObservable();

    userIsTypingSubjet = new BehaviorSubject<{ roomId: string, typing: boolean, typer: string } | null>(null);
    typing$ = this.userIsTypingSubjet.asObservable();

    userId!: string;


    sendMessage(message: any) {
        this.socket.emit('message', message);
    }

    typing(obj: { roomId: string, typing: boolean, typer: string }) {
        this.socket.emit('user is typing', obj);
    }

    getUserIsTyping() {
        this.socket.on('user is typing', (response) => {
            this.userIsTypingSubjet.next(response);
        })
        return of();
    }

    getNewMessage() {
        this.socket.on('message', (message) => {
            this.newMessageSubject.next(message);
            this.userIsTypingSubjet.next(null)
        });
        return this.newMessageSubject$
    }

    getJoinedRoom() {
        this.socket.on('joined_room', (joinedRoom: Room) => {
            this.joinedRoomSubject.next(joinedRoom._id);
            this.joinedRoomMessagesSubject.next(joinedRoom.messages);
        })
    }

    joinRoom() {
        return this.authService.authUser$.pipe(
            switchMap(authUser => {
                return this.selectdUser$.pipe(
                    switchMap(selectedUser => {
                        this.socket.emit('join_room', { user1: authUser, user2: selectedUser });
                        return EMPTY;
                    }))
            })
        )
    }

    formatDateFromTimestamp(timestamp: any) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }
}