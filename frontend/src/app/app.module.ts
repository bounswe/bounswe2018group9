import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';
import { DataModule } from './data/data.module';

import { AppConfigModule } from './app-config.module';
import { AppRoutingModule } from './app-routing.module';
import {ProfileModule} from './profile/profile.module';
import {EventsModule} from './events/events.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AuthModule.forRoot(),
    DataModule.forRoot(),
    AppConfigModule,
    AppRoutingModule,
    ProfileModule,
    EventsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
