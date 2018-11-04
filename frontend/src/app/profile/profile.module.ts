import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileLandingPage} from "./pages/profile-landing/profile-landing.page";
import {ProfileRoutingModule} from "./profile-routing.module";

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule
  ],
  declarations: [
    ProfileLandingPage]
})
export class ProfileModule { }
