import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    ToolbarComponent
  ],
  exports: [CommonModule, IonicModule, ToolbarComponent]
})
export class SharedModule { }
