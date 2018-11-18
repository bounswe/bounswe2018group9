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
  changeCityButton : boolean = false;
  changeEmailButton : boolean = false;
  changeNameButton : boolean = false;
  changeBirthButton : boolean = false;
  changeNationalityButton : boolean = false;
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

  changeName(newName: string) {
    let newUser : User = {
      name: newName,
      email: this.user.email,
      profileImage: this.user.profileImage,
      _id: this.user._id,
      birth: this.user.birth,
      city : this.user.city,
      followers : this.user.followers,
      following : this.user.following,
      interests : this.user.interests,
      nationality : this.user.nationality
    };
    this.presentLoading();
    this.authController.updateUser(this.userId,newUser).subscribe((res)=>{
      this.loadingController.dismiss();
      this.router.navigate(['/profile/settings']);
    },(err)=>{
      console.log(err);
      this.loadingController.dismiss();
      this.router.navigate(['/profile/settings']);
    });
    }

  changeEmail(newEmail: string) {
    let newUser : User = {
      name: this.user.name,
      email: newEmail,
      profileImage: this.user.profileImage,
      _id: this.user._id,
      birth: this.user.birth,
      city : this.user.city,
      followers : this.user.followers,
      following : this.user.following,
      interests : this.user.interests,
      nationality : this.user.nationality
    };
      this.presentLoading();
      this.authController.updateUser(this.userId,newUser).subscribe((res)=>{
        this.loadingController.dismiss();
        this.router.navigate(['/profile/settings']);
      },(err)=>{
        console.log(err);
        this.loadingController.dismiss();
        this.router.navigate(['/profile/settings']);
      });
    }
  changeBirth(newBirth : Datetime){

    let newUser : User = {
      name: this.user.name,
      email: this.user.email,
      profileImage: this.user.profileImage,
      _id: this.user._id,
      birth: newBirth,
      city : this.user.city,
      followers : this.user.followers,
      following : this.user.following,
      interests : this.user.interests,
      nationality : this.user.nationality
    };
      this.presentLoading();
      this.authController.updateUser(this.userId,newUser).subscribe((res)=>{
        this.loadingController.dismiss();
        this.router.navigate(['/profile/settings']);
      },(err)=>{
        console.log(err);
        this.loadingController.dismiss();
        this.router.navigate(['/profile/settings']);
      });

  }
  changeNationality(newNationality : string){

    let newUser : User = {
      name: this.user.name,
      email: this.user.email,
      profileImage: this.user.profileImage,
      _id: this.user._id,
      birth: this.user.birth,
      city : this.user.city,
      followers : this.user.followers,
      following : this.user.following,
      interests : this.user.interests,
      nationality : newNationality
    };
    this.presentLoading();
    this.authController.updateUser(this.userId,newUser).subscribe((res)=>{
      this.loadingController.dismiss();
      this.router.navigate(['/profile/settings']);
    },(err)=>{
      console.log(err);
      this.loadingController.dismiss();
      this.router.navigate(['/profile/settings']);
    });

  }
  changeCity(newCity : string){

    let newUser : User = {
      name: this.user.name,
      email: this.user.email,
      profileImage: this.user.profileImage,
      _id: this.user._id,
      birth: this.user.birth,
      city : newCity,
      followers : this.user.followers,
      following : this.user.following,
      interests : this.user.interests,
      nationality : this.user.nationality
    };
    this.presentLoading();
    this.authController.updateUser(this.userId,newUser).subscribe((res)=>{
      this.loadingController.dismiss();
      this.router.navigate(['/profile/settings']);
    },(err)=>{
      console.log(err);
      this.loadingController.dismiss();
      this.router.navigate(['/profile/settings']);
    });

  }
  savePrivacy(){

  }

  }
