import { Component, OnInit } from '@angular/core';
import {Event, User} from "../../../interfaces";
import {AuthService} from "../../../auth/providers/auth/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-profile-landing',
  templateUrl: './profile-landing.page.html',
  styleUrls: ['./profile-landing.page.scss'],
})
export class ProfileLandingPage implements OnInit {

  user: User | null = null;
  constructor(private auth : AuthService) { }

  ngOnInit() {
    this.getUser();

  }


  getUser(){
    if(this.auth.isAuthenticated()){
      this.user = this.auth.getUser();
    }
  }
}
