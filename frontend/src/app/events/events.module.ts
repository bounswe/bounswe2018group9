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
import { CommentBoxComponent } from './components/comment-box/comment-box.component';
import {SharedModule} from "../shared/shared.module";


import { MediaComponent } from './components/media/media.component';
import { SliderComponent } from './components/slider/slider.component';
import {SearchPage} from "./pages/search/search.page";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    EventRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    FeedPage,
    EventPage,
    EventCreatePage,
    SearchPage,
    EventCardComponent,
    SearchComponent,
    CommentBoxComponent,
    MediaComponent,
    SliderComponent
  ]
})
export class EventsModule { }
