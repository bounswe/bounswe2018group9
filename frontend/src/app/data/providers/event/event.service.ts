import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DataService } from '../data/data.service';
import { Event } from '../../../interfaces';
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class EventService extends DataService<Event> {
  protected api = 'events';

  constructor(protected http: HttpClient) {
    super(http);
  }

  vote(id: string){
    let path = '';
  }

}
