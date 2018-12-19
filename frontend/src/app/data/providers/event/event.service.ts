import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DataService } from '../data/data.service';
import {Attendance, Attendances, Comment, Event, Vote, Votes} from '../../../interfaces';
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class EventService extends DataService<Event> {
  protected api = 'events';

  constructor(protected http: HttpClient) {
    super(http);
  }

  vote(event_id: string, vote : Vote){
    return this.http.post<Vote>('/events/' + event_id + '/vote', vote);

  }

  comment(event_id: string, comment: Comment){
    return this.http.post<Comment>('/events/' + event_id + '/comments', comment);
  }

  attend(event_id: string, attendance: Attendance){
    return this.http.post<Attendance>('/events/' + event_id + '/attendance', attendance);
  }
  getAttendance(event_id: string) : Observable<Attendances> {
    return this.http.get('/'+ event_id+'/attendance');

  }
  getVotes(event_id: string) : Observable<Votes> {
    return this.http.get('/'+ event_id+'/vote');

  }

}
