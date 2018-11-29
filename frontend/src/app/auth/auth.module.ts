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
import { AuthGuard } from './guards/auth/auth.guard';
import { NoAuthGuard } from './guards/no-auth/no-auth.guard';

import { environment } from '../../environments/environment';
import { ForgotPasswordPage } from './pages/forgot-password/forgot-password.page';
import { ChangePasswordPage } from './pages/change-password/change-password.page';
import {NotFoundPage} from './pages/not-found/not-found.page';

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
    SignupPage,
    ForgotPasswordPage,
    ChangePasswordPage,
    NotFoundPage
  ],
  providers: [
    AuthService,
    AuthGuard,
    NoAuthGuard,
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
        AuthGuard,
        NoAuthGuard,
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
