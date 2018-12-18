import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  declarations: [
    ToolbarComponent
  ],
  exports: [CommonModule, IonicModule, ToolbarComponent]
})
export class SharedModule { }
