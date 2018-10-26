import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DataModule } from '../data/data.module';
import { EventRoutingModule } from './event-routing.module';

import { EventPage } from './pages/event/event.page';
import { FeedPage } from './pages/feed/feed.page';

import { EventCardComponent } from './components/event-card/event-card.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    DataModule,
    EventRoutingModule,
  ],
  declarations: [
    EventPage,
    FeedPage,
    EventCardComponent
  ]
})
export class EventsModule { }
