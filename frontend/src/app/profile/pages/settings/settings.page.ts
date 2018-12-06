import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {User} from '../../../interfaces';
import {AuthService} from '../../../auth/providers/auth/auth.service';
import {Datetime} from '@ionic/angular';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../data/providers/user/user.service';

@Component({
  selector: 'profile-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  gotUserData : boolean = false;
  loading : boolean = false;
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
  constructor(private authController: AuthService,
              private router: Router,
              private formBuilder : FormBuilder,
              private ref: ChangeDetectorRef,
              private userService : UserService) {
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
    this.userId = this.getUserId();
    this.loading = true;
    this.sub = this.userService.get(this.userId).subscribe(
      (res : User) => {
      console.log('Response:' + JSON.stringify(res));
      this.user = res;
      console.log('User:' + JSON.stringify(this.user));
      this.form.setValue({
        name: this.user.name || '',
        email: this.user.email || '',
        nationality: this.user.details.nationality || '',
        city: this.user.details.city || ''
      });
      this.displayBirth = this.user.details.birth;
      this.interestsSelected = this.user.interests;
      this.gotUserData = true;
      this.ref.detectChanges();
      this.loading = false;
      },(err)=>{
        console.log(err);
        this.loading = false;
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

  a
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
      details: {
        birth: this.displayBirth,
        city: this.form.value['city'],
        nationality: this.form.value['nationality'],
      },
      followers: this.user.followers,
      following: this.user.following,
      interests: this.interestsSelected
    };
    console.log(this.userId + ': ' + JSON.stringify(newUser));

    this.loading = true;
    this.userService.put(this.user._id, newUser).subscribe(
      (res)=>{
       alert('Saved');
        this.loading = false;
      },(err)=>{
        console.log(err);
        this.loading = false;
      });
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
