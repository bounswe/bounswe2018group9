import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event } from '../../../interfaces';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../data/providers/event/event.service';
import {Observable} from "rxjs/internal/Observable";

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit, OnDestroy{

  event: Observable<Event | Event[]>;
  private sub: any;
  event_id: string;


  constructor(private route: ActivatedRoute, private eventService: EventService) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if(params){
        this.event_id = params['id'];
        this.event = this.eventService.get(this.event_id);
      }
    });

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  prettyDate(date_str: string){
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let date = new Date(date_str);
    return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
  }

}
