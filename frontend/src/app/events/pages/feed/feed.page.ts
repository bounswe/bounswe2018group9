import { Component, OnInit } from '@angular/core';

import { Event } from '../../../interfaces';
import { EventService } from '../../../data/providers/event/event.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  private events: Event[];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.get()
      .subscribe((data: Event[]) => {
        this.events = data;
      }, error => {
        alert(error);
      });
  }

}
