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

  constructor(private backendService: BackendService){}

  onSubmit(form){
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
}
