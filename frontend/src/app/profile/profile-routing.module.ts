import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimelinePage } from './pages/timeline/timeline.page';
import { SettingsPage } from './pages/settings/settings.page';
import {ProfilePage} from './pages/profile/profile.page';
import {PublicPage} from './pages/public/public.page';


const routes: Routes = [
  { path: 'timeline', component: TimelinePage },
  { path: 'settings', component: SettingsPage },
  { path: 'welcome', component: ProfilePage},
  { path: 'public/:id', component: PublicPage},
  { path: '', redirectTo: 'welcome', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
