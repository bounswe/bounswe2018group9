import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Event, User, Comment, Attendance} from '../../../interfaces';
import {ActivatedRoute, Router} from '@angular/router';
import { EventService } from '../../../data/providers/event/event.service';

import {AlertController, LoadingController} from "@ionic/angular";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../auth/providers/auth/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {map} from "rxjs/operators";
import {AnnotationService} from '../../../annotation/annotation-service/annotation.service';
import {HighlightTag} from 'angular-text-input-highlight';
import {Annotation} from '../../../interfaces/annotation.interface';
import {UploadService} from "../../../data/providers/upload/upload.service";

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit, OnDestroy, AfterViewInit{
  @ViewChild('profileImage') profileImage;
  @ViewChild('content') content;
  form: FormGroup;
  event: Event | null;
  private sub: any;
  private fragmentSub;
  user: User;
  currentUser: User;
  event_id: string;
  commentsSec = false;

  annotations : HighlightTag[] = [];
  dateAnnotations : HighlightTag[] = [];
  priceAnnotations : HighlightTag[]=[];
  organizerAnnotations : HighlightTag[]=[];
  artistAnnotations : HighlightTag[]=[];
  durationAnnotations : HighlightTag[]=[];
  locationAnnotations : HighlightTag[]=[];
  descriptionAnnotations : HighlightTag[]=[];
  tagAnnotations : HighlightTag[]=[];
  @ViewChild('dateAnnotate') dateRef :ElementRef;
  @ViewChild('priceAnnotate') priceRef :ElementRef;
  @ViewChild('organizerAnnotate') organizerRef :ElementRef;
  @ViewChild('artistAnnotate') artistRef :ElementRef;
  @ViewChild('durationAnnotate') durationRef : ElementRef;
  @ViewChild('locationAnnotate') locationRef :ElementRef;
  @ViewChild('descriptionAnnotate') descriptionRef :ElementRef;
  @ViewChild('tagAnnotate') tagRef :ElementRef;
  xpaths = {};

  constructor(private route: ActivatedRoute,
              private eventService: EventService,
              private loadingController : LoadingController,
              private alertController : AlertController,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              public uploadService: UploadService,
              private router : Router,
              private annotationService : AnnotationService,) {
    this.form = this.formBuilder.group({
      body: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
    this.authService.getUserData(this.authService.getUserId())
       .subscribe(
         (user: User) => {
           this.currentUser = user;
         },
         error => {
           console.log('An error occurred while getting current user');
         }
       );

    this.route.params.subscribe(params => {
      if(params){
        this.event_id = params['id'];
        // Check whether the event is cached or not
        let eventCached;
        eventCached = this.eventService.getCachedEvent(this.event_id);
        if(eventCached === null){ // If not cached
          this.eventService.get(this.event_id).subscribe(
            (next : Event) =>{
              this.event = next;
              console.log('event', this.event)
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
            });
        } else{ // if cached
          this.event = eventCached;
          this.authService.getUserData(String(this.event.creator))
            .subscribe(
              (user: User) => {
                this.user = user;
              },
              error => {
                console.log('An error occurred while getting user');
              }
            );
        };
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
    if(this.dateRef)
      this.xpaths['date'] = this.getElementTreeXPath(this.dateRef.nativeElement);
    if(this.priceRef)
      this.xpaths['price'] = this.getElementTreeXPath(this.priceRef.nativeElement);
    if(this.organizerRef)
      this.xpaths['organizer'] = this.getElementTreeXPath(this.organizerRef.nativeElement);
    if(this.artistRef)
      this.xpaths['artist'] = this.getElementTreeXPath(this.artistRef.nativeElement);
    if(this.durationRef)
      this.xpaths['duration'] = this.getElementTreeXPath(this.durationRef.nativeElement);
    if(this.locationRef)
      this.xpaths['location'] = this.getElementTreeXPath(this.locationRef.nativeElement);
    if(this.descriptionRef)
      this.xpaths['description'] = this.getElementTreeXPath(this.descriptionRef.nativeElement);
    if(this.tagRef)
      this.xpaths['tag'] = this.getElementTreeXPath(this.tagRef.nativeElement);

    this.addAnnotations();
    //setTimeout(this.goToComments(),2000)
  }

  goToComments(){
    if(this.commentsSec){
      document.getElementById('comments').scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngOnDestroy() {
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



addAnnotations(){

  this.annotationService.getAnnotationsByPage(this.router.url).subscribe((next)=>{
    if(Array.isArray(next["annotations"])){
      while(next["annotations"].length  != 0 ){
        let annotation = next["annotations"].pop();
        let color = (annotation.creator == this.authService.getUserId()) ? 'bg-pink' : 'bg-blue';
        this.auth.getUserData(annotation.creator).subscribe((next : User)=>{
          if(annotation.target[0].selector.refinedBy && (annotation.target[0].selector.refinedBy.start == 0 || annotation.target[0].selector.refinedBy.start) &&
            annotation.target[0].selector.refinedBy.end){
            this.annotations.push({
              indices: {
                start: annotation.target[0].selector.refinedBy.start,
                end: annotation.target[0].selector.refinedBy.end
              },
              cssClass: color,
              data: {
                value : annotation.body[0].value,
                user: {name: next.name,id :next._id},
                profileImage : ((next.images && next.images.avatar) ? next.images.avatar: undefined),
                target: annotation.target[0].selector.value
              }
            });
          }else{
            console.log('An annotation does not have start and end fields.');
          }
        });

      }
    }else{
      let annotation  : Annotation = next;
      let color = (annotation.creator == this.authService.getUserId()) ? 'bg-pink' : 'bg-blue';
      this.auth.getUserData(annotation.creator).subscribe((next : User)=>{
        if(annotation.target[0].selector.refinedBy && annotation.target[0].selector.refinedBy.start && annotation.target[0].selector.refinedBy.end){
          this.annotations.push({
            indices: {
              start: annotation.target[0].selector.refinedBy.start,
              end: annotation.target[0].selector.refinedBy.end
            },
            cssClass: color,
            data: {
              value : annotation.body[0].value,
              user: {name: next.name,id :next._id},
              profileImage : ((next.images && next.images.avatar)  ? next.images.avatar: undefined),
              target: annotation.target[0].selector.value
            }
          });
        }else{
          console.log('An annotation does not have start and end fields.');
        }
      });

    }
  });
  this.annotations.forEach(annotation => {
    switch(annotation.data.target) {
      case this.xpaths['date']:
        this.dateAnnotations.push(annotation);
        break;
      case this.xpaths['price']:
        this.priceAnnotations.push(annotation);
        break;
      case this.xpaths['organizer']:
        this.organizerAnnotations.push(annotation);
        break;
      case this.xpaths['artist']:
        this.artistAnnotations.push(annotation);
        break;
      case this.xpaths['location']:
        this.locationAnnotations.push(annotation);
        break;
      case this.xpaths['duraton']:
        this.durationAnnotations.push(annotation);
        break;
      case this.xpaths['description']:
        this.descriptionAnnotations.push(annotation);
        break;
      case this.xpaths['tag']:
        this.tagAnnotations.push(annotation);
        break;
      default:
    }
  });

}
getElementTreeXPath(element) {
  let paths = [];

  // Use nodeName (instead of localName) so namespace prefix is included (if any).
  for (; element && element.nodeType == 1; element = element.parentNode)  {
    let index = 0;
    let hasMultiple = false;

    for (let sibling = element.previousSibling; sibling; sibling = sibling.previousSibling) {
      // Ignore document type declaration.
      if (sibling.nodeType == Node.DOCUMENT_TYPE_NODE)
        continue;

      if (sibling.nodeName == element.nodeName)
        ++index;
    }
    for (let sibling = element.nextSibling; sibling; sibling = sibling.nextSibling) {
      // Ignore document type declaration.
      if (sibling.nodeType == Node.DOCUMENT_TYPE_NODE)
        continue;

      if (sibling.nodeName == element.nodeName)
        hasMultiple = true;
    }

    var tagName = element.nodeName.toLowerCase();
    let otherWise = "";
    if(hasMultiple){
      otherWise = "[1]";
    }
    var pathIndex = (index ? "[" + (index+1) + "]" : otherWise);
    paths.splice(0, 0, tagName + pathIndex);
  }
  return paths.length ? "/" + paths.join("/") : null;
};
}
