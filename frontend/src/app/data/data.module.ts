import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { EventService } from './providers/event/event.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    EventService
  ]
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DataModule,
      providers: [ EventService ]
    }
  }
}
