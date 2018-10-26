import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AuthRoutingModule } from './auth-routing.module';
import { JwtModule } from '@auth0/angular-jwt';

import { SigninPage } from './pages/signin/signin.page';
import { SignupPage } from './pages/signup/signup.page'

import { AuthService, tokenGetter } from './providers/auth/auth.service';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    IonicModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [ environment.endpoint ]
      }
    }),
  ],
  declarations: [
    SigninPage,
    SignupPage
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [ AuthService ]
    }
  }
}
