import { Injectable } from '@angular/core';
import {DataService} from '../data/data.service';
import {User} from '../../../interfaces';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService extends DataService<User>{

  protected api = 'users';


  constructor(protected http: HttpClient) {
    super(http);
  }
}
