import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event } from '../../../interfaces';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../data/providers/event/event.service';

import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit, OnDestroy{

  event: Event | null = null;
  private sub: any;
  event_id: string;

  constructor(private route: ActivatedRoute, private eventService: EventService,
              private alertController : AlertController) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if(params){
        this.event_id = params['id'];
        this.eventService.get(this.event_id).subscribe(
          (next : Event) =>{
            this.event = next;
          },(err)=>{
            console.log(err);
          }
        );
      }
    });

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  prettyDate(date_str: string){
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let date = new Date(date_str);
    return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
  }

  async presentAlert(errMessage) {
    const alert = await this.alertController.create({
        header: 'Wait..',
        subHeader: 'The event couldn\'t be loaded',
        message: 'We cannot get the event information: ' + errMessage,
        buttons: ['Close']
      });
    await alert.present();
  }


}
