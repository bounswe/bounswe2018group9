import { Component, OnInit } from '@angular/core';

import { Event } from '../../../interfaces';

import { AuthService } from '../../../auth/providers/auth/auth.service';
import { EventService } from '../../../data/providers/event/event.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  events: Event[];

  constructor(private authService: AuthService, private eventService: EventService) { }

  ngOnInit() {
    this.eventService.get()
      .subscribe((data: Event[]) => {
        this.events = data;
      }, error => {
        alert(error);
      });
  }

  logout() {
    this.authService.logout();
  }
}
