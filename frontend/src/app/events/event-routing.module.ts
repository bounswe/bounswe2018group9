import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventPage } from './pages/event/event.page';
import { FeedPage } from './pages/feed/feed.page';

const routes: Routes = [
  { path: '', component: FeedPage },
  { path: '/:id', component: EventPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }