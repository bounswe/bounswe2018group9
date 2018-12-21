import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";

import { MediaComponent } from './components/media/media.component';
import { SliderComponent } from './components/slider/slider.component';
import { MapComponent } from './components/map/map.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    ToolbarComponent,
    MediaComponent,
    SliderComponent,
    MapComponent
  ],
  exports: [
    ToolbarComponent,
    MediaComponent,
    SliderComponent,
    MapComponent
  ]
})
export class SharedModule { }
