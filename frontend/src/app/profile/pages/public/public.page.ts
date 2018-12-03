import { Component, OnInit } from '@angular/core';
import {User} from '../../../interfaces';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../auth/providers/auth/auth.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.page.html',
  styleUrls: ['./public.page.scss'],
})
export class PublicPage implements OnInit {
  signedIn : boolean;
  private sub : any;
  userId : string;
  user : User;
  isFollowing : boolean;
  errorMessage : string;
  errorHappened : boolean = false;
  constructor(private route : ActivatedRoute, private auth : AuthService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if(params){
        this.userId= params['id'];
        this.auth.getUserData(this.userId).subscribe(
          (res)=>{
            this.user = res;
          },(err)=>{
            this.errorMessage = JSON.stringify(err);
            this.errorHappened = true;
          }
        );
      }
    });
    this.signedIn = this.auth.isAuthenticated();
    let signedInId : string;
    if(this.auth.isAuthenticated()){
      signedInId = this.auth.getUserId();
    }
    let signedInUser : User;
    this.auth.getUserData(signedInId).subscribe((res)=>{
      signedInUser = res;
    },(err)=>{
      console.log(err);
    });
    if(signedInUser) {
      this.isFollowing = signedInUser.following.includes(this.user);
    }
  }
  follow(){

   let signedInId : string;
   if(this.auth.isAuthenticated()){
     signedInId = this.auth.getUserId();
   }
    let signedInUser : User;
    this.auth.getUserData(signedInId).subscribe((res)=>{
      console.log(res);
      signedInUser = res;
   },(err)=>{
      console.log(err);
      return;
    });
    if(signedInUser){
      if(!signedInUser.following.includes(this.user)){
        this.auth.follow(signedInId,this.userId).subscribe(
          (res)=>{
            console.log(res);
          },
          (err)=>{
            console.log(err);
          }
        );
      }
    }


  }
}
