import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {User} from '../../../interfaces';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../auth/providers/auth/auth.service';
import {UserService} from '../../../data/providers/user/user.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.page.html',
  styleUrls: ['./public.page.scss'],
})
export class PublicPage implements OnInit {
  loading : boolean = false;
  signedIn : boolean;
  private sub : any;
  userId : string;
  user : User;
  signedInId : string;
  signedInUser : User;
  isFollowing : boolean;
  errorMessage : string;
  error : boolean = false;
  sameUser : boolean = false;
  constructor(private route : ActivatedRoute,
              private auth : AuthService,
              private ref: ChangeDetectorRef,
              private userService : UserService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if(params){
        this.userId= params['id'];
        this.loading = true;
        this.userService.get(this.userId).subscribe(
          (res : User)=>{
            this.user = res;
            this.loading = false;
          },(err)=>{
            this.errorMessage = JSON.stringify(err);
            this.error = true;
            this.loading = false;
          }
        );
      }
    });
    if(this.auth.isAuthenticated()){
      this.signedInId = this.auth.getUserId();
      if(this.signedInId == this.userId) {
        this.sameUser = true;
      }
      this.signedIn = true;
      this.loading = true;
      this.userService.get(this.signedInId).subscribe(
        (res : User)=>{
        this.signedInUser = res;
        this.isFollowing = this.signedInUser.following.includes(this.userId);
          this.loading = false;
        },(err)=>{
          console.log(err);
          this.loading = false;
        });
    }

  }
  follow(){
    console.log('follow');
    if(this.signedInUser){
      this.auth.follow(this.signedInId,this.userId).subscribe(
        (res)=>{
          console.log(res);
          this.isFollowing = true;
          this.ref.detectChanges();
        },
        (err)=>{
          console.log(err);
        }
      );
    }

  }
  unfollow(){
    console.log('unfollow');
    if(this.signedInUser){
      this.auth.unfollow(this.signedInId,this.userId).subscribe(
        (res)=>{
          console.log(res);
          this.isFollowing = false;
          this.ref.detectChanges();
        },
        (err)=>{
          console.log(err);
        }
      );
    }

  }
}
