import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Event } from '../../../interfaces';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class FeedService extends DataService<Event> {
  api = 'feed';

  constructor(protected http: HttpClient) {
    super(http);
  }
}
