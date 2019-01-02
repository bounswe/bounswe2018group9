import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { User, Event } from '../../../interfaces';

import { AuthService } from '../../../auth/providers/auth/auth.service';
import { EventService } from '../../../data/providers/event/event.service';
import {SearchService} from "../../../data/providers/search/search.service";

import { TagSelectorComponent } from '../../components/tag-selector/tag-selector.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  private static count = 3;
  private skip = 0;

  user: User;
  events: Event[] = [];
  interests: string[] = [];
  loaded: boolean = true;

  constructor(
    private router: Router,
    private popoverController: PopoverController,
    private alertController: AlertController,
    private authService: AuthService,
    private eventService: EventService
  ) {
    this.load();
  }

  ngOnInit() {
    this.authService.getUserData(this.authService.getUserId())
      .subscribe(data => {
        this.user = data;
        this.interests = data.interests;
      });
  }

  /**
   * Loads feed entries and appends entries to the existing loaded events
   * @param {number} start the start index of will-be-loaded events
   * @param {number} count the desired count for the load batch
   */
  load(event: any = null, start: number = this.skip, count: number = FeedPage.count) {
    this.eventService.get(null, { limit: count, skip: start })
      .subscribe((data: Event[]) => {
        if (!data || data.length === 0) {
          this.loaded = false;
        }

        this.events.push(...data);
        this.eventService.cacheEvents(data);
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

  async stateInterests() {
    let popover = await this.popoverController.create({
      backdropDismiss: true,
      component: TagSelectorComponent,
      componentProps: { selected: this.interests ? this.interests : [] },
      cssClass: 'popover'
    });
    popover.onDidDismiss().then((event) => {
      this.interests = event.data;
      this.user.interests = this.interests;
      this.authService.updateUser(this.authService.getUserId(), this.user)
        .subscribe(result => {});
    });
    return await popover.present();
  }

  async refresh() {
    this.skip = 0;
    this.events = [];
    this.loaded = true;
  }
}
