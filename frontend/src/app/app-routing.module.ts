import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

const routes: Routes = [
  { path: 'feed', loadChildren: './profile/events/events.module#EventsModule'},
  { path: 'profile', loadChildren: './profile/profile.module#ProfileModule'},
  { path: '', loadChildren: './auth/auth.module#AuthModule', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { enableTracing:true , preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
