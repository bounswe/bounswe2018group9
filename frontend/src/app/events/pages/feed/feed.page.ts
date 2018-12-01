import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User, Event, Comment, Post, Media } from '../../../interfaces';

import { AuthService } from '../../../auth/providers/auth/auth.service';
import { EventService } from '../../../data/providers/event/event.service';
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  user: User;
  feed: Post[]

  events: Event[];
  private eventSub : any;

  constructor(private router: Router, private authService: AuthService, private eventService: EventService, public loadingController: LoadingController) { }

  ngOnInit() {
    this.populateFeed();

    /*
    this.presentLoading();
    this.eventSub = this.eventService.get()
      .subscribe((data: Event[]) => {
        this.events = data;
      }, error => {
        alert(error);
      },()=>{
        this.loadingController.dismiss();
      });
    */
  }

  populateFeed() {
    this.user = this.authService.getUser();
    this.user = {
      _id: this.user._id,
      name: 'Oğuz Kaan Yüksel',
      email: 'okyksl@gmail.com',
      image: {
        type: 0,
        file: 'resources/icon.png'
      }
    };

    let comment: Comment = {
      author: this.user,
      reference: this.user,
      parent: null,
      text: 'This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment.',
      media: [] as [Media],
      votes: {
        count: {
          0: 10,
          1: 1
        },
        votes: [
          {
            type: 0,
            user: this.user
          }
        ]
      }
    };

    let event: Event = {
      creator: this.user,
      title: 'Event Example',
      description: 'This is an event example. This is an event example. This is an event example. This is an event example. This is an event example. This is an event example. This is an event example. This is an event example. This is an event example.',
      artists: [ 'Maroon 5' ],
      tags: [ 'rock', 'alternative' ],
      media: [
        {
          file: 'resources/icon.png',
          type: 0
        }
      ],
      date: 0,
      location: {

      },
      price: {
        amount: 10,
        currency: 'TL'
      },
      votes: {
        count: {
          0: 10,
          1: 300
        },
        votes: [
          {
            type: 1,
            user: this.user
          }
        ]
      },
      comments: {
        count: 1,
        comments: [
          {
            author: this.user,
            reference: '',
            parent: null,
            text: 'This is a comment!',
            media: [] as [Media],
            votes: {
              count: {
                0: 100,
                1: 0
              },
              votes: [] as [any]
            }
          }
        ]
      },
      attendances: {
        count: {
          0: 0,
          1: 1,
          2: 0,
          3: 0,
          4: 0
        },
        attendances: [
          {
            user: this.user,
            type: 1
          }
        ]
      }
    };

    this.feed = [
      {
        type: 1,
        content: comment
      },
      {
        type: 0,
        content: event
      }
    ];
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
