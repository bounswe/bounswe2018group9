import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../interfaces';
import {AuthService} from '../../../auth/providers/auth/auth.service';
import {Datetime, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'profile-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  form : FormGroup;
  @Input('displayBirth') displayBirth : Datetime;
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
  Router, private formBuilder : FormBuilder) {
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.pattern('[ a-zA-Z]*')]],
        email: ['', [Validators.required, Validators.email]],
        nationality: ['', [Validators.pattern('[ a-zA-Z]*')]],
        city: ['', [Validators.pattern('[ a-zA-Z]*')]]
      }
    );
  }

  ngOnInit() {
    this.presentLoading();
    this.userId = this.getUserId();
    this.sub = this.authController.getUserData(this.userId).subscribe((res : User) => {
      console.log('Response:' + res);
      console.log('User:' + this.user);
      this.form.setValue({
        name: this.user.name,
        email: this.user.email,
        nationality: this.user.userDetails.nationality,
        city: this.user.userDetails.city
      });
      this.displayBirth = this.user.userDetails.birth;
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


  save(){
    let newUser : User;
    newUser = {
      name: this.form.value['name'],
      email: this.form.value['email'],
      userDetails: {
        birth: this.displayBirth,
        city: this.form.value['city'],
        nationality: this.form.value['nationality'],
      },
      followers: this.user.followers,
      following: this.user.following,
      interests: this.interestsSelected
    };
    this.presentLoading();
    console.log(this.userId + ': ' + JSON.stringify(newUser));
    this.loadingController.dismiss();

    /* this.authController.updateUser(this.user._id, newUser).subscribe((res)=>{
       this.loadingController.dismiss();
       alert('Saved');
     },(err)=>{
       this.loadingController.dismiss();

     });*/
  }
  isSelected(interest : string) : boolean{
    if(this.interestsSelected){
      return this.interestsSelected.includes(interest);
    }
    else{
      return false;
    }
  }
  updateInterestsLocally(newSelectedInterests: string[]){
    this.interestsSelected = newSelectedInterests;
  }
}
