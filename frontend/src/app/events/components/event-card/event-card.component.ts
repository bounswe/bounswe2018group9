import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../../../interfaces/index";

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input('event') event: Event;

  randomProfileImage: string;
  likes: number;
  comments: number;
  hours: number;

  date: Date;
  date_str: string;

  constructor() { }

  ngOnInit() {
    let url = 'https://randomuser.me/api/portraits/';

    let gender = Math.random() > 0.5 ? 'men' : 'women';
    let randNum = this.getRndInteger(1, 80);
    this.randomProfileImage = url + gender + '/' + randNum + '.jpg';

    this.likes = this.getRndInteger(1, 100);
    this.comments = this.getRndInteger(1, 25);
    this.hours = this.getRndInteger(1,24);

    this.date = new Date(this.event.date);

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.date_str = this.date.getDate() + ' ' + months[this.date.getMonth()] + ' ' + this.date.getFullYear();

    /*console.log(this.event);
    console.log(this.date);*/

  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

}
