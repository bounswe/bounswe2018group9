import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {NotFoundPage} from './auth/pages/not-found/not-found.page';

const routes: Routes = [
  { path: 'feed', loadChildren: './events/events.module#EventsModule'},
  { path: 'profile', loadChildren: './profile/profile.module#ProfileModule'},
  { path: '', loadChildren: './auth/auth.module#AuthModule', pathMatch: 'full'},
  { path: '**', component: NotFoundPage}];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { enableTracing : false , preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
