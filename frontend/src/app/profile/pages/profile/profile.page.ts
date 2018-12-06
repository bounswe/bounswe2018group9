import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../interfaces';
import {AuthService} from '../../../auth/providers/auth/auth.service';
import {UserService} from '../../../data/providers/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  gotUserData : boolean = false;
  followedBy : User[];
  following : User[];
  notifications : String[];
  settings : String[];
  messages : String[];
  interests : String[] = ['Movie', 'Music','Theatre'];
  private sub : any;
  user: User | null;
  userId : string | null;
  constructor(private auth : AuthService,
              private router : Router,
              private route: ActivatedRoute,
              private userService : UserService
  ) { }

  ngOnInit() {
    this.userId = this.getUserId();
    this.sub = this.userService.get(this.userId).subscribe(
      (res : User)=>{
      this.user = res;
      this.gotUserData = true;
    },(err)=>{
      console.log(err);
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }


  getUserId() : string{
    if(this.auth.isAuthenticated()){
      return this.auth.getUserId();
    }
  }


}
