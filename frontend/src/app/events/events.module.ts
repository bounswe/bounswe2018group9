import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EventRoutingModule } from './event-routing.module';

import { FeedPage } from './pages/feed/feed.page';
import { EventPage } from './pages/event/event.page';
import { EventCreatePage } from './pages/event-create/event-create.page';

import { MediaComponent } from './components/media/media.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { CommentCardComponent } from './components/comment-card/comment-card.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    EventRoutingModule
  ],
  declarations: [
    FeedPage,
    EventPage,
    EventCreatePage,
    MediaComponent,
    EventCardComponent,
    CommentCardComponent
  ]
})
export class EventsModule { }
