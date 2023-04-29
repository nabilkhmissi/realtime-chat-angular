import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, of, tap } from "rxjs";
import { loadingService } from "./loading.service";
import { NotificationService } from "./notification.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient,
        private router: Router,
        private loadingService: loadingService,
        private notificationService: NotificationService) { }

    baseUrl = 'https://talkywalky.onrender.com/api';

    authUser$ = new BehaviorSubject<any | null>(null);

    login(user: any) {
        this.loadingService.showLoading();
        return this.http.post(`${this.baseUrl}/auth/login`, user).pipe(
            tap(response => {
                this.loadingService.hideLoading()
                this.saveUserToDB(response);
                this.authUser$.next(response)
                this.router.navigate(['/chatroom'])
            }),
            catchError(error => {
                this.loadingService.hideLoading()
                console.log(error)
                this.notificationService.showNotifications(error.error.message)
                return of()
            })
        )
    }
    signup(user: any) {
        this.loadingService.showLoading();
        return this.http.post<{ message: string }>(`${this.baseUrl}/auth/signup`, user).pipe(
            tap(response => {
                this.loadingService.hideLoading();
                this.notificationService.showNotifications(response.message);
                this.router.navigate(['/login'])
            }),
            catchError(error => {
                this.loadingService.hideLoading()
                this.notificationService.showNotifications(error.error.message)
                return of();
            })
        )
    }

    saveUserToDB(user: any) {
        localStorage.setItem('talkywalkyUser', JSON.stringify(user))
    }

    getUserFromLocalStorage() {
        let user = localStorage.getItem('talkywalkyUser');
        if (user) {
            user = JSON.parse(user);
            this.authUser$.next(user);
        };
    }

    logout() {
        localStorage.removeItem('talkywalkyUser');
        this.router.navigate(['/login']);
    }
}