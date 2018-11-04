import { Component, OnInit } from '@angular/core';
import {User} from "../../../interfaces";
import {AuthService} from "../../../auth/providers/auth/auth.service";

@Component({
  selector: 'app-profile-landing',
  templateUrl: './profile-landing.page.html',
  styleUrls: ['./profile-landing.page.scss'],
})
export class ProfileLandingPage implements OnInit {

  user: User;

  constructor(private auth : AuthService) { }

  ngOnInit() {
  }


  getUser(){

  }
}
