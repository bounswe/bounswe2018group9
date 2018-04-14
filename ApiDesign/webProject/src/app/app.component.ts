import { Component } from '@angular/core';
import { BackendService } from "./services/backend-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tweetCounters = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  tweets : Array<string>;
  homeTweets: Array<{
    text: string,
    user: string,
    time: string
  }>;

  countryTrends: Array<{
    name: string,
    url: string
  }>;
  postTweetMessage;

  constructor(private backendService: BackendService){}

  onGetTweetsSubmit(form){
    console.log(form);
    let keyword: string = form.value['keyword'];
    let count: number = form.value['count'];
    this.backendService.getTweetsIncluding(keyword, count)
      .subscribe(
        (data: Array<string>) => {
          this.tweets = data;
          },
          error => {
          console.log(error);
        }
      );
  }

  onPostTweetsSubmit(form){
    const tweetText : string = form.value['tweetText'];

    this.backendService.postTweet(tweetText).subscribe(
      (data) => {
        this.postTweetMessage = 'Your tweet is successfully posted!';
      },
      error => {
        console.log(error)
      },
      () => {
        this.postTweetMessage = 'Your tweet is successfully posted!';
      }
    );
  }

  onGetHomeSubmit(form){
    const numOfTweets = form.value['count'];

    this.backendService.getHomeTimeline(numOfTweets).subscribe(
      (dataReceived:Array<{
        text: string,
        user: string,
        time: string
      }>) => {
        this.homeTweets = dataReceived;
      },
      error => {
        console.log(error);
      }
    )
  }

  onGetTrendsForCountrySubmit(form){
    const countryName = form.value['countryName'];

    this.backendService.getTrendsForCountry(countryName).subscribe(
      (dataReceived: Array<{
        name: string,
        url: string;
      }>) => {
        this.countryTrends = dataReceived;
      }
    )
  }
}
