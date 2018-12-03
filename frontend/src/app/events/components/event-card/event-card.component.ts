import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../../../interfaces";

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input('event') event: Event;
  @Input('view') view = false;
  timeDiff;
  timeDiffUnit;

  constructor() { }

  ngOnInit() {

    let now = new Date();
    let eventCreated = new Date(this.event.date);

    console.log(now);
    console.log(eventCreated);

    let timeDiff_ms = now.getTime() - eventCreated.getTime();

    let timeDiff_m = timeDiff_ms / (60*1000);
    let timeDiff_h = timeDiff_ms / (60*60*1000);
    let timeDiff_d = timeDiff_ms / (24*60*60*1000);

    console.log(timeDiff_m, timeDiff_h, timeDiff_d);

    if(timeDiff_m < 60){
      this.timeDiff = timeDiff_m;
      this.timeDiffUnit = timeDiff_m != 1 ? 'minutes' : 'minute';
    } else if(timeDiff_h < 24){
      this.timeDiffUnit = timeDiff_h != 1 ? 'hours' : 'hour';
      this.timeDiff = timeDiff_h;
    } else{
      this.timeDiffUnit = timeDiff_d != 1 ? 'days' : 'day';
      this.timeDiff = timeDiff_d;
    }

    this.timeDiff = Math.floor(this.timeDiff);


  }

  isUndefined(val) { return typeof val === 'undefined'; }

}
