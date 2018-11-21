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
  @Input('displayName') displayName : string;
  displayEmail : string;
  displayBirth : Datetime;
  displayNationality : string;
  displayCity : string;

  settings : string[];
  interests : string[] = [
    'Movie'
    ,'Music'
    ,'Jazz'
    ,'Biennial'
    ,'Theater'
    ,'Exhibition'
    ,'Modern Art'
    ,'Art Movie'
    ,'Photography'
    ,'Travel'
    ,'Festival'
    ,'Museum'
    ,'Workshop'
    ,'Ballet'
    ,'Dance'
    ,'Classical Music'
    ,'Opera'
    ,'Blues'
    ,'Turkish Folk Music'
    ,'Concert'
  ];

  interestsSelected : string[];

  user: User | null;
  private sub : any;
  userId : string | null = null;
  constructor(private authController: AuthService, private loadingController : LoadingController, private router:
  Router, private alertController: AlertController) { }

  ngOnInit() {
    this.presentLoading();
    this.userId = this.getUserId();
    this.sub = this.authController.getUserData(this.userId).subscribe((res : User) => {
      this.user = res;

      this.displayName = this.user.userDetails.name;
      this.displayEmail = this.user.email;
      this.displayBirth = this.user.userDetails.birth;
      this.displayNationality = this.user.userDetails.nationality;
      this.displayCity = this.user.userDetails.city;
      this.interestsSelected = this.user.interests;

      this.loadingController.dismiss();
    },(err)=>{
      console.log(err);
      this.loadingController.dismiss();
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
  customPopoverOptionsPrivacy: any = {
    header: 'Select who can see your posts',
  };
  customPopoverOptionsInterests: any = {
    header: 'Select your interests',
  };

  async presentLoading(){
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 100
    });
    return await loading.present();
  }
  getUserId() : string {
    if(this.authController.isAuthenticated()){
      return this.authController.getUserId();
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
    let newUser : User;
    newUser = {
      email: this.displayEmail,
      profileImage: this.user.profileImage,
      userDetails: {
        name: this.displayName,
        birth: this.displayBirth,
        city: this.displayCity,
        nationality: this.displayNationality,
      },
      followers: this.user.followers,
      following: this.user.following,
      interests: this.interestsSelected,
      _id: this.user._id
    };
    console.log(JSON.stringify(newUser));
    this.presentLoading();
    this.authController.updateUser(this.user._id,newUser).subscribe((res)=>{
      console.log(res);
      this.loadingController.dismiss();
      alert('Saved');
    },(err)=>{
      console.log(err);
      this.loadingController.dismiss();

    });
  }
  isSelected(interest : string){
    return this.interestsSelected.includes(interest);
  }
  updateInterestsLocally(newSelectedInterests: string[]){
    this.interestsSelected = newSelectedInterests;
  }
}
