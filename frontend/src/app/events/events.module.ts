import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EventRoutingModule } from './event-routing.module';

import { FeedPage } from './pages/feed/feed.page';
import { EventPage } from './pages/event/event.page';
import { EventCreatePage } from './pages/event-create/event-create.page';

import { EventCardComponent } from './components/event-card/event-card.component';
import {SearchComponent} from './components/search/search.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    EventRoutingModule,
    FormsModule
  ],
  declarations: [
    FeedPage,
    EventPage,
    EventCreatePage,
    EventCardComponent,
    SearchComponent
  ]
})
export class EventsModule { }
