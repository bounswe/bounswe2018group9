import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../interfaces';
import {AuthService} from '../../../auth/providers/auth/auth.service';
import {AlertController, Datetime, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'profile-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  nameDisabled = true;
  emailDisabled = true;
  birthDisabled = true;
  nationalityDisabled = true;
  cityDisabled = true;
  settings : String[];
  interests : String[] = ['i1','i2','i3'];
  user: User | null;
  private sub : any;
  userId : string | null = null;
  constructor(private authController: AuthService, private loadingController : LoadingController, private router:
  Router, private alertController: AlertController) { }

  ngOnInit() {
    this.presentLoading();
    this.userId = this.getUser()._id;
    this.sub = this.authController.getUserData(this.userId).subscribe((res : User) => {
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
  customPopoverOptions: any = {
    header: 'Select who can see your posts',
  };

  async presentLoading(){
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 100
    });
    return await loading.present();
  }
  getUser() : User{
    if(this.authController.isAuthenticated()){
      return this.authController.getUser();
    }
  }


  toggleName() {
    this.nameDisabled = !this.nameDisabled;
  }
  toggleEmail() {
    this.emailDisabled = !this.emailDisabled;
  }
  toggleBirth() {
    this.birthDisabled = !this.birthDisabled;
  }
  toggleNationality() {
    this.nationalityDisabled = !this.nationalityDisabled;
  }
  toggleCity(){
    this.cityDisabled = !this.cityDisabled;
  }
  save(){
    alert('Saved');
  }
}
