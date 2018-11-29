import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserSearchPage} from './pages/user-search/user-search.page';
import {EventSearchPage} from './pages/event-search/event-search.page';
import {SelectionPage} from './pages/selection/selection.page';


const routes: Routes = [
  { path : 'user', component: UserSearchPage},
  { path : 'event', component: EventSearchPage },
  { path : 'select', component: SelectionPage},
  { path : '', redirectTo: 'select', pathMatch: 'full'},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
