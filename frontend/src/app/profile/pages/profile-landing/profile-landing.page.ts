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
    if(this.auth.isAuthenticated()){
      this.this.auth.getUser()
    }

  }


  getUser(){

  }
}
