import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

import {Event} from "../../models/event.interface";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  getEvents():Observable<Array<Event>>{
      return this.http.get<Array<Event>>('/resources/api/events.json');
  }
}
