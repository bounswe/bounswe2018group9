import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../auth/providers/auth/auth.service";
import {Event, User} from "../../../interfaces";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
  currentUser: User;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUserData(this.authService.getUserId())
      .subscribe(
        user => this.currentUser = user,
        error => console.log(error)
      )
  }

  sortFunction(e1: Event, e2: Event){
    return e1.date > e2.date;
  }

}
