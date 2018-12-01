import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
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
  loadedEvents : boolean = false;
  private eventSub : any;

  constructor(private router: Router, private authService: AuthService, private eventService: EventService) { }

  ngOnInit() {
    this.eventSub = this.eventService.get()
      .subscribe((data: Event[]) => {
        this.events = data;
        this.loadedEvents = true;
      }, error => {
        console.log(error);
      });
  }

  ngOnDestroy(){
    this.eventSub.unsubscribe();
  }
  logout() {
    this.authService
      .logout()
      .subscribe(response => {
        this.router.navigate(['/signin']);
      })
  }

}
