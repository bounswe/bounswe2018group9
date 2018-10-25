import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../../interfaces";

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input('event') event: Event;

  constructor() { }

  ngOnInit() {
  }

}
