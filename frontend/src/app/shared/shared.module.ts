import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";

import { MediaComponent } from './components/media/media.component';
import { SliderComponent } from './components/slider/slider.component';

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
    SliderComponent
  ],
  exports: [
    ToolbarComponent,
    MediaComponent,
    SliderComponent
  ]
})
export class SharedModule { }
