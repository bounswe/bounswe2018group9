import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserSearchPage} from './pages/user-search/user-search.page';
import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SearchRoutingModule} from './search-routing.module';
import {EventSearchPage} from './pages/event-search/event-search.page';
import {SelectionPage} from './pages/selection/selection.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    SearchRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    UserSearchPage,
    EventSearchPage,
    SelectionPage
  ],
})
export class SearchModule { }
