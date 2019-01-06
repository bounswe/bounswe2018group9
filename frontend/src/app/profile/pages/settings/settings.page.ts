import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Media, User} from '../../../interfaces';
import {AuthService} from '../../../auth/providers/auth/auth.service';
import {Datetime} from '@ionic/angular';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MediaService} from "../../../native/providers/media/media.service";
import {UploadService} from "../../../data/providers/upload/upload.service";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'profile-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  gotUserData : boolean;
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
  profileImage: {avatar?: string; cover?: string;};
  media = [];
  interestsSelected : string[];
  user: User | null;
  private sub : any;
  userId : string | null = null;
  constructor(private authController: AuthService,
              private router: Router,
              private formBuilder : FormBuilder,
              private ref: ChangeDetectorRef,
              private mediaService: MediaService,
              private uploadService: UploadService,
              public toastController: ToastController) {
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        nationality: [''],
        city: ['']
      }
    );
  }

  ngOnInit() {
    this.userId = this.getUserId();
    this.sub = this.authController.getUserData(this.userId).subscribe((res : User) => {
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
      this.profileImage = this.user.images === undefined ? {avatar: '', cover: ''} : this.user.images;
      if(this.profileImage.avatar){
        this.media.push({source: this.profileImage.avatar, type: 0})
      }
      if(this.profileImage.cover){
        this.media.push({source: this.profileImage.cover, type: 0});
      }
      this.ref.detectChanges();
    },(err)=>{
      console.log(err);
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
      interests: this.interestsSelected,
      images: this.profileImage
    };
    console.log(this.userId, newUser);

    this.authController.updateUser(this.user._id, newUser).subscribe((res)=>{
      this.presentToast();

     },(err)=>{
      console.log(err);
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

  /**
   * Controls interaction with the media component
   * @param {number }} event
   */
  async onEvent(event: { key: string, slide: number }) {
    if (event.key == 'add') {
      let media = await this.mediaService.get({ file: true })
        .catch(error => {});

      if (media) {
        // add media
        this.media = [ ...this.media.slice(0, event.slide),
          ...media,
          ...this.media.slice(event.slide, this.media.length) ];

        // upload files
        media.forEach(media => {
          this.uploadService.upload(media.file)
            .response.subscribe(result => {
              media.source = result.body.file;
              if(event.slide === 0){
                this.profileImage.avatar = result.body.file;
              } else if(event.slide === 1){
                this.profileImage.cover = result.body.file;
              }
              console.log(this.media);
          }, error => {
            // TODO: Handle upload error
            console.log(error);
          });
        })
      }
    } else if (event.key == 'remove') {
      // remove media
      this.media = [ ...this.media.slice(0, event.slide),
        ...this.media.slice(event.slide + 1, this.media.length) ];
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      position: 'top',
      message: 'Settings have been changed.',
      duration: 2000
    });
    toast.present();
  }

}
