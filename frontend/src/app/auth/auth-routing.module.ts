import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninPage } from './pages/signin/signin.page';
import { SignupPage } from './pages/signup/signup.page';
import { ForgotPasswordPage } from './pages/forgot-password/forgot-password.page';
import { ChangePasswordPage } from './pages/change-password/change-password.page';


import { NoAuthGuard } from './guards/no-auth/no-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SigninPage, canActivate: [ NoAuthGuard ] },
  { path: 'signup', component: SignupPage, canActivate: [ NoAuthGuard ] },
  { path: 'forgot-password', component: ForgotPasswordPage  },
  { path: 'change-password', component: ChangePasswordPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
