import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileLandingPage} from "./pages/profile-landing/profile-landing.page";
import {ProfileRoutingModule} from "./profile-routing.module";
import {IonicModule} from "@ionic/angular";

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    IonicModule
  ],
  declarations: [
    ProfileLandingPage]
})
export class ProfileModule { }
