import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileLandingPage} from "./pages/profile-landing/profile-landing.page";


const routes: Routes = [
  { path: '', component: ProfileLandingPage},
  { path: 'timeline', loadChildren: './pages/timeline/timeline.module#TimelinePageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
