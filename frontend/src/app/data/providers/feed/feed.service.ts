import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Event } from '../../../interfaces';
import { DataService } from '../data/data.service';

export interface FeedParams {
  before?: number;
  after?: number;
  limit?: number;
  event?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FeedService extends DataService<Event> {
  api = 'feed';

  constructor(protected http: HttpClient) {
    super(http);
  }

  get(id: string = '', params: FeedParams = this.params): Observable<Event | Event[]> {
    return super.get(id, params)
  }
}
