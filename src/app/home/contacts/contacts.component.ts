import { Component, HostBinding } from '@angular/core';
import { routeAnimationState } from '../../../../shared/route.animation';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
  animations: [routeAnimationState],
})
export class ContactsComponent {
  @HostBinding('@routeAnimationTrigger') routeAnimation = true;
}
