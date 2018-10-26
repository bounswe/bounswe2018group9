import { Injectable } from '@angular/core';

import { DataService } from '../data/data.service';
import { Event } from '../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class EventService extends DataService<Event> {
  protected api = 'events';
}
