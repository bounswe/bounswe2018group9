import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { EventService } from './providers/event/event.service';
import { UploadService } from './providers/upload/upload.service';
import {SearchService} from "./providers/search/search.service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    EventService,
    UploadService,
    SearchService
  ]
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DataModule,
      providers: [
        EventService,
        UploadService,
        SearchService
      ]
    }
  }
}
