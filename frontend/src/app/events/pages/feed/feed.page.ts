import { Component, OnInit } from '@angular/core';

import { Event } from '../../../interfaces';

import { AuthService } from '../../../auth/providers/auth/auth.service';
import { EventService } from '../../../data/providers/event/event.service';
import {LoadingComponent} from "../../../general/components/loading/loading.component";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  events: Event[];
  loadingComponent : LoadingComponent = new LoadingComponent(new LoadingController());
  private eventSub : any;

  constructor(private authService: AuthService, private eventService: EventService) { }

  ngOnInit() {
    this.loadingComponent.presentLoading(10000);
    this.eventSub = this.eventService.get()
      .subscribe((data: Event[]) => {
        this.events = data;
      }, error => {
        alert(error);
      },()=>{
        this.loadingComponent.loadingController.dismiss();
      });
  }

  ngOnDestroy(){
    this.eventSub.unsubscribe();
  }
  logout() {
    this.authService.logout();
  }
}
