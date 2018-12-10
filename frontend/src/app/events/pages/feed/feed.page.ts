import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Event } from '../../../interfaces';

import { AuthService } from '../../../auth/providers/auth/auth.service';
import { EventService } from '../../../data/providers/event/event.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  private static count = 3;

  private skip = 0;
  private events: Event[] = [];

  constructor(private router: Router, private authService: AuthService, private eventService: EventService) {
    this.load();
  }

  ngOnInit() {

  }

  /**
   * Loads feed entries and appends entries to the existing loaded events
   * @param {number} start the start index of will-be-loaded events
   * @param {number} count the desired count for the load batch
   */
  load(event: any = null, start: number = this.skip, count: number = FeedPage.count) {
    this.eventService.get(null, { limit: count, skip: start })
      .subscribe((data: Event[]) => {
        this.events.push(...data);
        this.skip += count;

        if (event) { // finalize infinite-scroll animation
          event.target.complete();
        }
      }, error => {
        if (event) { // finalize infinite-scroll animation
          event.target.complete();
        }
        // TODO: Display error!
      });
  }

  logout() {
    this.authService
      .logout()
      .subscribe(response => {
        this.router.navigate(['/signin']);
      })
  }

}
