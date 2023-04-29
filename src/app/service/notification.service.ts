import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    constructor() { }

    private notificationSubject = new BehaviorSubject<string | null>(null);
    notifications$ = this.notificationSubject.asObservable();


    showNotifications(notification: string) {
        this.notificationSubject.next(notification)
    }
    hideNotifications() {
        this.notificationSubject.next(null)
    }

}