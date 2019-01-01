import { environment } from '../../environments/environment';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {IonicModule, Slide} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SliderComponent} from "./components/slider/slider.component";
import {MediaComponent} from "./components/media/media.component";

import { AgmCoreModule } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { MediaComponent } from './components/media/media.component';
import { SliderComponent } from './components/slider/slider.component';
import { MapComponent } from './components/map/map.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey,
      libraries: [ 'places' ]
    })
  ],
  declarations: [
    ToolbarComponent, SliderComponent, MediaComponent,
    MapComponent
  ],
  providers: [
    Geolocation
  ],
  exports: [
    ToolbarComponent,
    MediaComponent,
    SliderComponent,
    MapComponent
  ]
})
export class SharedModule { }
