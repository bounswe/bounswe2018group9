import { Component, OnInit } from '@angular/core';

import { Event } from "../../interfaces";
import { EventService } from '../../services';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  events: Array<Event>;

  constructor(private eventService: EventService){
    
  }

  ngOnInit(){
    this.eventService.get()
      .subscribe(
        (data: Event[]) => {
          console.log(data);
          this.events = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }



}
