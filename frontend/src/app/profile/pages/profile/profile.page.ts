import {Component, OnInit} from '@angular/core';
import { LoadingController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../interfaces';
import {AuthService} from '../../../auth/providers/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  followedBy : User[];
  following : User[];
  notifications : String[];
  settings : String[];
  messages : String[];
  interests : String[] = ['Movie', 'Music','Theatre'];
  private sub : any;
  user: User | null = null;
  userId : string | null = null;
  constructor(private auth : AuthService,private loadingController : LoadingController, private router : Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.routeConfig);
    this.presentLoading();
    this.userId = this.getUser()._id;
    this.sub = this.auth.getUserData(this.userId).subscribe((res : User)=>{
      this.user = res;
      this.loadingController.dismiss();
    },(err)=>{
      console.log(err);
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
