import { Injectable } from '@angular/core';
<<<<<<< HEAD
import {Event} from '../../models/event.interface';
=======
import { HttpClient} from "@angular/common/http";

import {Event} from "../../models/event.interface";
import {Observable} from "rxjs/internal/Observable";
>>>>>>> fronent(http): Add HttpClient Module

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }


  getEvents():Observable<Array<Event>>{
      return this.http.get<Array<Event>>('/resources/api/events.json');
  }
}
