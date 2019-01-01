import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Event, User, Comment, Attendance} from '../../../interfaces';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../data/providers/event/event.service';

import {AlertController, LoadingController} from "@ionic/angular";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../auth/providers/auth/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit, OnDestroy, AfterViewInit{
  @ViewChild('profileImage') profileImage;
  @ViewChild('content') content;
  form: FormGroup;
  event: Event | null = null;
  private sub: any;
  private fragmentSub;
  user: User;
  currentUser: User;
  event_id: string;
  commentsSec = false;

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
    //this.currentUser = this.authService.getUserFromToken();

    this.authService.getUserData(this.authService.getUserId())
       .subscribe(
         (user: User) => {
           this.currentUser = user;
         },
         error => {
           console.log('An error occurred while getting current user');
         }
       );

    this.sub = this.route.params.subscribe(params => {
      if(params){
        this.event_id = params['id'];
        this.eventService.get(this.event_id).subscribe(
          (next : Event) =>{
            this.event = next;
            console.log(this.event);

            this.authService.getUserData(String(this.event.creator))
              .subscribe(
                (user: User) => {
                  this.user = user;
                },
                error => {
                  console.log('An error occurred while getting user');
                }
              );
          },(err)=>{
            console.log(err);
          }
        );
      }
    });
  }

  ngAfterViewInit(){
    // Capture the fragment if available
    this.fragmentSub = this.route
      .fragment
      .subscribe(
        fragment => {
          if (fragment && fragment === 'comments') {
            this.content.scrollToBottom();
            console.log(this.content);
          }
        });
    }

  goToComments(){
    if(this.commentsSec){
      document.getElementById('comments').scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.fragmentSub.unsubscribe();
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
    comment.author = this.currentUser._id;

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

  attendEvent(attendanceType){
    let attendance: Attendance = {
      user: this.user,
      attendanceType: attendanceType
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
