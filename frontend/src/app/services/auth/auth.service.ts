import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../interfaces';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static readonly options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(@Inject('ENDPOINT') private endpoint: string, private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token === null) return false;
    return !this.jwtHelper.isTokenExpired(token);
  }

  getUser(): User | null {
    const token = localStorage.getItem('token');
    if (token === null) return null;
    const decoded = this.jwtHelper.decodeToken(token);
    return { _id: decoded._id };
  }

  register(data: { firstname: string, lastname: string, email: string, password: string }) {
    this.http
      .post('https://' + this.endpoint + '/api/users', data, AuthService.options)
      .subscribe(response => {
        this.router.navigate(['/signin']);
      });
  }

  login(data: { email: string, password: string }) {
    this.http
      .post('https://' + this.endpoint + '/api/auth/login', data, AuthService.options)
      .subscribe(response => {
        localStorage.setItem('token', response['token']);
        this.router.navigate(['/home']);
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }
}
