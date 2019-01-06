import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {User} from '../../../interfaces';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../auth/providers/auth/auth.service';
import {UploadService} from '../../../data/providers/upload/upload.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-public',
  templateUrl: './public.page.html',
  styleUrls: ['./public.page.scss'],
})
export class PublicPage implements OnInit {
  signedIn : boolean;
  private sub : any;
  userId : string;
  user : User;
  signedInId : string;
  signedInUser : User;
  isFollowing : boolean;
  errorMessage : string;
  error : boolean = false;
  sameUser : boolean = false;
  avatarImageURL: string;
  constructor(private route : ActivatedRoute,
              private auth : AuthService,
              private ref: ChangeDetectorRef,
              public uploadService: UploadService,
              public toastController: ToastController) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if(params){
        this.userId= params['id'];
        this.auth.getUserData(this.userId).subscribe(
          (res)=>{
            this.user = res;
            console.log(res);
            this.avatarImageURL = this.uploadService.getUrl(this.user.images.avatar);
          },(err)=>{
            this.errorMessage = JSON.stringify(err);
            this.error = true;
          }
        );
      }
    });
    if(this.auth.isAuthenticated()){
      this.signedInId = this.auth.getUserId();
      if(this.signedInId == this.userId) this.sameUser = true;
      this.signedIn = true;
      this.auth.getUserData(this.signedInId).subscribe((res)=>{
        this.signedInUser = res;
        this.isFollowing = this.signedInUser.following.includes(this.userId);
      },(err)=>{
        console.log(err);
      });
    }
  }
  follow(){
    if(this.signedInUser){
      this.auth.follow(this.signedInId,this.userId).subscribe(
        (res)=>{
          console.log(res);
          this.isFollowing = true;
          this.ref.detectChanges();
          this.presentToastFollow();
        },
        (err)=>{
          console.log(err);
        }
      );
    }

  }
  unfollow(){
    console.log('unfollow');
    if(this.signedInUser){
      this.auth.unfollow(this.signedInId,this.userId).subscribe(
        (res)=>{
          console.log(res);
          this.isFollowing = false;
          this.ref.detectChanges();
          this.presentToastUnfollow();
        },
        (err)=>{
          console.log(err);
        }
      );
    }

  }

  async presentToastFollow() {
    const toast = await this.toastController.create({
      position: 'top',
      message: 'User has been followed.',
      duration: 2000
    });
    toast.present();
  }

  async presentToastUnfollow() {
    const toast = await this.toastController.create({
      position: 'top',
      message: 'User has been unfollowed.',
      duration: 2000
    });
    toast.present();
  }
}
