import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable()
export class BackendService {

  constructor(private httpClient: HttpClient) { }

  getTweetsIncluding(keyword: string, count: number){
    let params = new HttpParams().append('keyword', keyword).append('count', count.toString());
    return this.httpClient.get('/api/twitter/tweets', {params: params});
  }

  postTweet(tweetText: string,){
    const body = {
      tweetText: tweetText
    }
    return this.httpClient.post('/api/twitter/tweets', body);
  }

  getHomeTimeline(numOfTweets: number){
    let params = new HttpParams().append('count', numOfTweets.toString());
    return this.httpClient.get('/api/twitter/home', {params: params});
  }

  getTrendsForCountry(countryName:string){
    return this.httpClient.get('/api/twitter/trends/' + countryName);
  }
}
