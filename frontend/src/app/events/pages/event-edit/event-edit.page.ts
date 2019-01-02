import { Component, OnInit } from '@angular/core';
import {Event, User} from "../../../interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../../data/providers/event/event.service";
import {AuthService} from "../../../auth/providers/auth/auth.service";

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.page.html',
  styleUrls: ['./event-edit.page.scss'],
})
export class EventEditPage implements OnInit {
  eventId: string;
  event: Event;
  eventCreator: User;

  constructor(private route: ActivatedRoute,
              private eventService: EventService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  this.route.params.subscribe(params => {
    if(params){
      this.eventId = params['id'];
      this.eventService.get(this.eventId).subscribe(
        (next : Event) =>{
          this.event = next;
          console.log(this.event);

          this.authService.getUserData(String(this.event.creator))
            .subscribe(
              (user: User) => {
                this.eventCreator = user;
              },
              error => {
                console.log('An error occurred while getting user');
              }
            );
        },(err)=>{
          console.log(err);
        }
      );
    }});
  }

  editEvent(eventEdited: Event){
    this.eventService.put(this.eventId, eventEdited)
      .subscribe(
        (response)=>{
          console.log('Event is edited succesfully');
          this.router.navigate(['feed', this.eventId]);
        },
        (error) => {
          console.log('An error occurred when editing the form');
        }
      );
  }

}
