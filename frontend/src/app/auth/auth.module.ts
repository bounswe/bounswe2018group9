import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AuthRoutingModule } from './auth-routing.module';
import { JwtModule, JwtInterceptor, JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

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
    AuthRoutingModule
  ],
  declarations: [
    SigninPage,
    SignupPage
  ],
  providers: [
    AuthService,
    // JWT Providers
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: JWT_OPTIONS,
      useValue: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [ environment.endpoint ]
      }
    },
    JwtHelperService
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        // JWT Interceptor
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptor,
          multi: true
        }
      ]
    }
  }
}
