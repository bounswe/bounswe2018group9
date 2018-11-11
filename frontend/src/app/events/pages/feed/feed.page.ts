import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Event } from '../../../interfaces';

import { AuthService } from '../../../auth/providers/auth/auth.service';
import { EventService } from '../../../data/providers/event/event.service';
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  events: Event[];
  private eventSub : any;

  constructor(private router: Router, private authService: AuthService, private eventService: EventService, public loadingController: LoadingController) { }

  ngOnInit() {
    this.presentLoading();
    this.eventSub = this.eventService.get()
      .subscribe((data: Event[]) => {
        this.events = data;
      }, error => {
        alert(error);
      },()=>{
        this.loadingController.dismiss();
      });
  }

  async presentLoading(){
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 10000
    });
    return await loading.present();
  }

  ngOnDestroy(){
    this.eventSub.unsubscribe();
  }
  logout() {
    this.authService
      .logout()
      .subscribe(response => {
        this.router.navigate(['/signin']);
      })
  }
}
