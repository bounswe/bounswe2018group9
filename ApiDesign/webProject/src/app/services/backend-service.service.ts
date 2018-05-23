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

  retweet(id: string){
    return this.httpClient.get('api/twitter/retweet/' + id);
  }

  getHomeTimeline(numOfTweets: number){
    let params = new HttpParams().append('count', numOfTweets.toString());
    return this.httpClient.get('/api/twitter/home', {params: params});
  }

  getTrendsForCountry(countryName:string){
    return this.httpClient.get('/api/twitter/trends/' + countryName);
  }

  getAccountDescription(){
    return this.httpClient.get('api/twitter/account/description');
  }

  setAccountDescription(desc: string){
    const body = {
      newDesc: desc
    }
    return this.httpClient.post('api/twitter/account/description', body);
  }

  setAccountUrl(url: string){
    const body = {
      url: url
    };
    return this.httpClient.post('api/twitter/account/url', body);
  }

  getFollowers(screenName: string){
    return this.httpClient.get('api/twitter/followers', {
      params: new HttpParams().append('screen_name', screenName)
    })
  }

  uploadImage(imageFile: File){
    const uploadData = new FormData();
    uploadData.append('image', imageFile, imageFile.name);
    return this.httpClient.post('/api/twitter/media/upload', uploadData);
  }

  tweetWithImage(tweetText: string, fileName: string){
    const body = {
      tweetText: tweetText,
      imagePath: fileName
    };

    return this.httpClient.post('/api/twitter/tweetWithMedia', body);
  }

  searchForLocation(lat, long){
    let params = new HttpParams().append('lat', lat.toString()).append('long', long.toString());
    return this.httpClient.get('api/twitter/geo/search', {params: params});
  }
}
