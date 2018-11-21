import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/internal/operators';

import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../../interfaces';


export function tokenGetter() {
  return localStorage.getItem('token');
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static readonly options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token === null){
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }

  getUser(): User | null {
    const token = localStorage.getItem('token');
    if (token === null) return null;
    const decoded = this.jwtHelper.decodeToken(token);
    return { _id: decoded._id };
  }


  register(data: { name: string, email: string, password: string }): Observable<any> {
    return this.http
      .post('/api/auth/signup', data, AuthService.options);
  }

  login(data: { email: string, password: string }): Observable<any> {
    return this.http
      .post('/api/auth/signin', data, AuthService.options)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response['token']);
        })
      );
  }

  logout(): Observable<any> {
    localStorage.removeItem('token');
    return of(true);
  }
}
