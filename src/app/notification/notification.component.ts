import { Component, Input, OnInit } from '@angular/core';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private notificationService: NotificationService) { }

  @Input() notification!: string;

  ngOnInit(): void {
  }

  hideNotif() {
    this.notificationService.hideNotifications()
  }

}
