import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileLandingPage } from "./profile-landing.page";
import { ProfileRoutingModule } from "./profile-routing.module";
import { IonicModule } from "@ionic/angular";
import { SettingsPage } from './pages/settings/settings.page';
import { TimelinePage } from './pages/timeline/timeline.page';
import {ProfilePage} from './pages/profile/profile.page';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    IonicModule,
    FormsModule
  ],
  declarations: [
    ProfileLandingPage,
    SettingsPage,
    TimelinePage,
    ProfilePage
  ]
})
export class ProfileModule { }
