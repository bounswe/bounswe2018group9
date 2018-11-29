import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-profile-landing',
  templateUrl: './profile-landing.page.html',
  styleUrls: ['./profile-landing.page.scss'],
})
export class ProfileLandingPage implements OnInit {


  constructor(private router : Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

  }

  ngOnDestroy(){
  }

}
