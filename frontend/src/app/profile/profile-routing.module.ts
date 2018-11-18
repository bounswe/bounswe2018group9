import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileLandingPage } from "./profile-landing.page";
import { TimelinePage } from './pages/timeline/timeline.page';
import { SettingsPage } from './pages/settings/settings.page';
import {ProfilePage} from './pages/profile/profile.page';


const routes: Routes = [
  { path: 'profile', component: ProfileLandingPage, children:[
      { path: 'timeline', component: TimelinePage },
      { path: 'settings', component: SettingsPage },
      { path: '', component: ProfilePage, pathMatch: 'full'}
    ]},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
