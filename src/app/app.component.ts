import { Component } from '@angular/core';
import { MessageServcie } from './service/message.service';
import { AuthService } from './service/auth.service';
import { loadingService } from './service/loading.service';
import { NotificationService } from './service/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loading$ = this.loadingService.loading$;
  notifications$ = this.notificationServcie.notifications$;

  constructor(private loadingService: loadingService,
    private chatService: MessageServcie,
    private authService: AuthService,
    private notificationServcie: NotificationService) {
    this.authService.getUserFromLocalStorage();
    /*     this.chatService.getSelectedUserFromLocalStorage() */
  }
  title = 'talkywalky';
}
