import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DataService } from '../data/data.service';
import {Attendance, Comment, Event} from '../../../interfaces';
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class EventService extends DataService<Event> {
  protected api = 'events';
  cachedEvents: Array<Event> = [];

  constructor(protected http: HttpClient) {
    super(http);
  }

  vote(id: string){
    let path = '';
  }

  comment(event_id: string, comment: Comment){
    return this.http.post<Comment>('/events/' + event_id + '/comments', comment);
  }

  attend(event_id: string, attendance: Attendance){
    return this.http.post<Attendance>('/events/' + event_id + '/attendance', attendance);
  }

  cacheEvents(events: Array<Event>){
    events.forEach(event => this.cachedEvents.push(event));
  }

  getCachedEvent(event_id): Event | null{
    for(let i=0; i<this.cachedEvents.length; i++){
      let e = this.cachedEvents[i];
      if(e._id = event_id) return e;
    }
    return null;
  }

}
