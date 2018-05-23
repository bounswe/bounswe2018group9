import { Component } from '@angular/core';
import { BackendService } from "./services/backend-service.service";
import MakeThisAwesomeCommand from "@angular/cli/commands/easter-egg";

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

  followers: Array<{
    id: string,
    name: string,
    screenName: string,
    description: string,
    profileImageUrl: string
  }>;

  postTweetMessage: string;
  retweetMessage: string;
  descriptionText: string;
  newDescription: string;
  newAccountUrl: string;
  mediaUploadMessage: string;
  file: File;
  fileName: string;
  geoLocations: Array<any>;


  constructor(private backendService: BackendService){}

  onGetTweetsSubmit(form){
    let keyword: string = form.value['keyword'];
    let count: number = form.value['count'];
    this.backendService.getTweetsIncluding(keyword, count)
      .subscribe(
        (dataReceived: {
          status: string,
          data: Array<string>
        }) => {
          this.tweets = dataReceived.data;
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
        console.log(error);
        this.postTweetMessage = 'An error occurred posting your tweet!'
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

  onRetweet(form){
    const tweetId = form.value['tweetId'];
    this.backendService.retweet(tweetId)
      .subscribe(
        (dataReceived: {
          status: string,
          data: string
        }) => {
          this.retweetMessage = dataReceived.data;
        },
        (error:any) => {
          console.log(error);
          this.retweetMessage = error.error.data.message;
        }
      )
  }

  onGetAccountDescription(){
    this.backendService.getAccountDescription()
      .subscribe((response: {
        status: string,
        data: string
      }) => {
        console.log(response);
        this.descriptionText = response.data;
      }, (error) => {
        console.log(error);
      });
  }

  onSetAccountDescription(form){
    const newDesc: string = form.value['description'];
    this.backendService.setAccountDescription(newDesc)
      .subscribe((response: {
        status: string,
        data: string
      }) => {
        console.log(response);
        this.newDescription = response.data;
      }, (error) => {
        console.log(error);
      });
  }

  onSetAccountUrl(form){
    const url: string = form.value['url'];
    this.backendService.setAccountUrl(url)
      .subscribe(
        (response: {
          status: string,
          data: string
        }) => {
          this.newAccountUrl = response.data;
        },
        (error) => {
          console.log(error);
        }
      )
  }

  onGetFollowers(form){
    const screenName: string = form.value['screenName'];
    this.backendService.getFollowers(screenName)
      .subscribe(
        (response: {
          status: string,
          data: Array<{
            id: string,
            name: string,
            screenName: string,
            description: string,
            profileImageUrl: string
          }>
        }) => {
          this.followers = response.data;
        },
        (error) => {
          console.log(error);
        }
      )
  }

  onFileChange(event){
    this.file = event.target.files[0];
    console.log(this.file);
  }
  onTweetMedia(form){
    const tweetText = form.value['tweetTextMed'];
    this.backendService.uploadImage(this.file)
      .subscribe(
        (response: {
          status: string,
          data: any
        }) => {
          const fileName = response.data.filename;

          this.backendService.tweetWithImage(tweetText, fileName)
            .subscribe(
              (response: {
                status: string,
                data: string
              }) => {
                this.mediaUploadMessage = response.data;
              },
              err => console.log(err)
            );
        },
        (error) => {
          console.log(error);
        }
      )
  }

  onGeoSearch(form){
    const lat = form.value['lat'];
    const long = form.value['long'];
    this.backendService.searchForLocation(lat, long)
      .subscribe(
        (response:{
          status:string,
          data: Array<any>
         }) => {
          this.geoLocations = response.data;
        }
      ),
      (error) => {
        console.log(error);
      }
  }
}
