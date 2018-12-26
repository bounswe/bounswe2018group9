import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedPage } from './pages/feed/feed.page';
import { EventPage } from './pages/event/event.page';
import { EventCreatePage } from './pages/event-create/event-create.page';

import { AuthGuard } from '../auth/guards/auth/auth.guard';
import {SearchPage} from "./pages/search/search.page";

const routes: Routes = [
  { path: '', component: FeedPage, canActivate: [ AuthGuard ], pathMatch: 'full' },
  { path: 'create', component: EventCreatePage, canActivate: [ AuthGuard ] },
  { path: 'search', component: SearchPage},
  { path: ':id', component: EventPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
