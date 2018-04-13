import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable()
export class BackendService {

  constructor(private httpClient: HttpClient) { }

  getTweetsIncluding(keyword: string, count: number){
    let params = new HttpParams().append('keyword', keyword).append('count', count.toString());
    return this.httpClient.get('/getTweets', {params: params});
  }
}
