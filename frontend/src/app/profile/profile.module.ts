import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from "./profile-routing.module";
import { IonicModule } from "@ionic/angular";
import { SettingsPage } from './pages/settings/settings.page';
import { TimelinePage } from './pages/timeline/timeline.page';
import {ProfilePage} from './pages/profile/profile.page';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PublicPage} from './pages/public/public.page';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    SettingsPage,
    TimelinePage,
    ProfilePage,
    PublicPage
  ]
})
export class ProfileModule { }
