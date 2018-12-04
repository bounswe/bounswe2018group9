import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Event, User, Comment, Attendance} from '../../../interfaces';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../data/providers/event/event.service';

import {AlertController, LoadingController} from "@ionic/angular";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../auth/providers/auth/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit, OnDestroy{
  @ViewChild('profileImage') profileImage;
  form: FormGroup;
  event: Event | null = null;
  private sub: any;
  user: User;
  event_id: string;

  constructor(private route: ActivatedRoute,
              private eventService: EventService,
              private loadingController : LoadingController,
              private alertController : AlertController,
              private authService: AuthService,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      body: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
    //this.presentLoading();
    this.user = this.authService.getUserFromToken();
    this.sub = this.route.params.subscribe(params => {
      if(params){
        this.event_id = params['id'];
        this.eventService.get(this.event_id).subscribe(
          (next : Event) =>{
            this.event = next;
            console.log(this.event);
          },(err)=>{
            console.log(err);
          }
        );
      }
    });


  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async presentLoading(){
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    return await loading.present();
  }
  async presentAlert(errMessage) {
    const alert = await this.alertController.create({
        header: 'Wait..',
        subHeader: 'The event couldn\'t be loaded',
        message: 'We cannot get the event information: ' + errMessage,
        buttons: ['Close']
      });
    await alert.present();
  }

  onProfileImageError(){
    (<HTMLImageElement>this.profileImage.nativeElement).src='../../../../assets/profile.jpg';
  }

  createComment(){
    let comment: Comment = this.form.value;

    comment.parentId = this.event_id;
    comment.author = this.user._id;

    console.log(comment);


    this.eventService.comment(this.event_id, comment)
      .subscribe(
        (next) => {
          this.event.comments.push(comment);
          this.form.setValue({body: ''});
        },
        error => {
          console.log('An error occurred when commenting', error);
        }
      );
  }

  attendEvent(){
    let attendance: Attendance = {
      user: this.user,
      attendanceType: 1
    };
    console.log(attendance);

    this.eventService.attend(this.event_id, attendance)
      .subscribe(
        data => {
          this.event.attendance.push(attendance);
        },
        error => {
          console.log('An error occurred when attending', error);
        }
      );
  }

  isUndefined(val) { return typeof val === 'undefined'; }


}
