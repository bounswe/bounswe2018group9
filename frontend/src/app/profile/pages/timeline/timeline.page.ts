import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../auth/providers/auth/auth.service";
import {User} from "../../../interfaces";

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

}
