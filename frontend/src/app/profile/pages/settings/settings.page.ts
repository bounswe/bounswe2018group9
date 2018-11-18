import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../interfaces';
import {AuthService} from '../../../auth/providers/auth/auth.service';
import {ProfilePage} from '../profile/profile.page';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'profile-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  settings : String[];
  interests : String[];
  user: User | null;
  private sub : any;
  userId : string | null = null;
  constructor(private authController: AuthService, private loadingController : LoadingController) { }

  ngOnInit() {
    this.presentLoading();
    this.userId = this.getUser()._id;
    this.sub = this.authController.getUserData(this.userId).subscribe((res : User) => {
      this.user = res;
      console.log(res);
    },(err)=>{
      console.log(err);
    },()=>{
      this.loadingController.dismiss();
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
  customPopoverOptions: any = {
    header: 'This is header: Hello',
    subHeader: 'This is subheader. Just a dummy popover selector',
    message: 'This is message'
  };

  async presentLoading(){
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 10000
    });
    return await loading.present();
  }
  getUser() : User{
    if(this.authController.isAuthenticated()){
      return this.authController.getUser();
    }
  }
}
