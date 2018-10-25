import { Component, OnInit } from '@angular/core';
import {BackendService} from "../../services/backend/backend.service";
import { Event } from "../../interfaces";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  events: Array<Event>;

  constructor(private backend: BackendService){
    
  }

  ngOnInit(){
    this.backend.getEvents()
      .subscribe(
        (data) => {
          console.log(data);
          this.events = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }



}
