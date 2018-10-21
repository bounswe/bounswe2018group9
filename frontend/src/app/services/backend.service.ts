import { Injectable } from '@angular/core';

import { HttpClient} from "@angular/common/http";

import {Event} from "../../models/event.interface";
import {Observable} from "rxjs/internal/Observable";
import { User } from '../../models/user.interface';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }


  getEvents():Observable<Array<Event>>{
      return this.http.get<Array<Event>>('/resources/api/events.json');
  }

  getUser():User{
      return {
        "email": "aaaa@aa.com",
        "firstName": "Ahmet",
        "lastName": "Ege",
        "profileImage": "https://picsum.photos/200/300"
      }

  }
}
