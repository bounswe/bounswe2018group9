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
  private api = 'auth';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token === null){
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }

  getUserId(): string | null {
    const token = localStorage.getItem('token');
    if (token === null) return null;
    const decoded = this.jwtHelper.decodeToken(token);
    return decoded._id;
  }

  getUserFromToken(){
    const token = localStorage.getItem('token');
    if (token === null) return null;
    const decoded = this.jwtHelper.decodeToken(token);
    return decoded;
  }

  register(data: {name: string, email: string, password: string }): Observable<any> {
    return this.http
      .post('/' + this.api + '/signup', data);
  }

  login(data: { email: string, password: string }): Observable<any> {
    return this.http
      .post('/' + this.api + '/signin', data)
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

  forgotPassword(data: {email: string}){

  }

  changePassword(data: {userId: string ,password: string , againPassword: string}){

  }
  getUserData(userId : string) : Observable<any>{
    return this.http.get('/users/'+userId);
  }
  updateUser(userId : string , data : User) : Observable<any>{
    return this.http.put('/users/'+ userId , data);
  }
  follow(signedInId: string, userToFollow : string){
      let data = { id: userToFollow};
    return this.http.post('/users/' + signedInId +'/follow',data);
  }
  unfollow(signedInId: string, userToUnfollow : string){
    let data = { id: userToUnfollow};
    return this.http.post('/users/' + signedInId +'/unfollow',data);
  }
}
