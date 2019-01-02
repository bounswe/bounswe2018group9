import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EventRoutingModule } from './event-routing.module';

import { FeedPage } from './pages/feed/feed.page';
import { EventPage } from './pages/event/event.page';
import { EventCreatePage } from './pages/event-create/event-create.page';

import {SearchComponent} from './components/search/search.component';
import { CommentBoxComponent } from './components/comment-box/comment-box.component';
import {SharedModule} from "../shared/shared.module";


import { EventFormComponent } from './components/event-form/event-form.component';
import { SearchPage } from './pages/search/search.page';
import {EventEditPage} from "./pages/event-edit/event-edit.page";
import {AnnotationModule} from '../annotation/annotation.module';

import { TagSelectorComponent } from './components/tag-selector/tag-selector.component';
import { DateSelectorComponent } from './components/date-selector/date-selector.component';
import { PriceSelectorComponent } from './components/price-selector/price-selector.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    EventRoutingModule,
    FormsModule,
    AnnotationModule,
    SharedModule
  ],
  entryComponents: [
    TagSelectorComponent,
    DateSelectorComponent,
    PriceSelectorComponent
  ],
  declarations: [
    FeedPage,
    EventPage,
    EventCreatePage,
    SearchPage,
    SearchComponent,
    CommentBoxComponent,
    EventFormComponent,
    EventEditPage,
    TagSelectorComponent,
    DateSelectorComponent,
    PriceSelectorComponent
  ]
})
export class EventsModule { }
