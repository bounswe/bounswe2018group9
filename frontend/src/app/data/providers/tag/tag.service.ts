import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class TagService extends DataService<string> {
  api = 'utils/tags'

  constructor(protected http: HttpClient) {
    super(http);
  }
}
