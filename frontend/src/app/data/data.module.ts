import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { EventService } from './providers/event/event.service';
import { UploadService } from './providers/upload/upload.service';
import {SearchService} from "./providers/search/search.service";
import { TagService } from './providers/tag/tag.service';
import { FeedService } from './providers/feed/feed.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    EventService,
    UploadService,
    SearchService,
    TagService,
    FeedService
  ]
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DataModule,
      providers: [
        EventService,
        UploadService,
        SearchService,
        TagService,
        FeedService
      ]
    }
  }
}
