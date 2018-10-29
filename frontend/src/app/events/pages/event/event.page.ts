import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event } from '../../../interfaces';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../data/providers/event/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit, OnDestroy{

  isDataAvailable = false;
  eventPromise: Promise<Event>;
  event: Event;
  private sub: any;
  event_id: string;


  constructor(private route: ActivatedRoute, private eventService: EventService) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if(params){
        this.event_id = params['id'];
        console.log(this.event_id);
      }
    });

    this.getEvent().then(
      ()=>{this.isDataAvailable = true;},
      ()=>{console.log('rejected promise');}
    );
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getEvent() {
    this.eventPromise = new Promise<Event>((resolve, reject) => {
      this.eventService.get(this.event_id)
        .subscribe((data: Event) => {
          this.event = data;
          resolve();
        }, (error) => {
          console.log(error);
          reject(error);
        });

    });
    return this.eventPromise;
  }

}
