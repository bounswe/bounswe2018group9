import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { Event } from '../../../interfaces';

import { AuthService } from '../../../auth/providers/auth/auth.service';
import { EventService } from '../../../data/providers/event/event.service';
import {SearchService} from "../../../data/providers/search/search.service";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  private static count = 3;

  private skip = 0;
  events: Event[] = [];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
    private eventService: EventService,
    private searchService: SearchService
  ) {
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
      }, async (error) => {
        if (event) { // finalize infinite-scroll animation
          event.target.complete();
        }

        // TODO: Develop a consensus on frontend error handling
        const alert = await this.alertController.create({
          header: 'Oops!',
          subHeader: 'Something is wrong?',
          message: 'Seems like we can\'t talk with our good old friends, servers!',
          buttons: ['OK']
        });
        await alert.present();
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
