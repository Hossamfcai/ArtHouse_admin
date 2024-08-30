import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent {
  @Input() title: string = 'Notification';
  @Input() message: string = 'This is a toast message';
  @Input() time: string = 'just now';

  isVisible = false;

  show() {
    this.isVisible = true;
    setTimeout(() => this.hide(), 3000); // Auto-hide after 3 seconds
  }

  hide() {
    this.isVisible = false;
  }
}
