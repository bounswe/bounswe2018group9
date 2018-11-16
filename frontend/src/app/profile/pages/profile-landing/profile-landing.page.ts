import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../interfaces";
import {AuthService} from "../../../auth/providers/auth/auth.service";
import {Content, LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-profile-landing',
  templateUrl: './profile-landing.page.html',
  styleUrls: ['./profile-landing.page.scss'],
})
export class ProfileLandingPage implements OnInit {

  followedBy : User[];
  following : User[];
  notifications : String[];
  settings : String[];
  messages : String[];
  interests : String[] = ['Movie', 'Music','Theatre'];
  private sub : any;
  user: User | null = null;
  userId : string | null = null;
  constructor(private auth : AuthService,private loadingController : LoadingController) { }
  @ViewChild(Content) content: Content;

  ngOnInit() {
    this.presentLoading();
    this.userId = this.getUser()._id;
    this.sub = this.auth.getUserData(this.userId).subscribe((res : User)=>{
      this.user = res;
    },(err)=>{
      console.log(err);
    },()=>{
      this.loadingController.dismiss();
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }


   getUser() : User{
    if(this.auth.isAuthenticated()){
       return this.auth.getUser();
    }
  }
  async presentLoading(){
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 10000
    });
    return await loading.present();
  }
}
