import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../interfaces';
import {AuthService} from '../../../auth/providers/auth/auth.service';
import {UploadService} from "../../../data/providers/upload/upload.service";

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
  avatarImageURL: string;
  constructor(private auth : AuthService,
              private router : Router,
              private route: ActivatedRoute,
              private uploadService:UploadService) { }

  ngOnInit() {
    this.userId = this.getUserId();
    this.sub = this.auth.getUserData(this.userId).subscribe((res : User)=>{
      this.user = res;
      if(this.user.images && this.user.images.avatar){
        this.avatarImageURL = this.uploadService.getUrl(this.user.images.avatar);
      }
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
