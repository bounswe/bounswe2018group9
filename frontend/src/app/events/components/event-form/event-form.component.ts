import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../auth/providers/auth/auth.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Attendance, Event, Media} from "../../../interfaces";
import {EventService} from "../../../data/providers/event/event.service";
import {MediaService} from "../../../native/providers/media/media.service";
import {Router} from "@angular/router";
import {AlertController} from "@ionic/angular";
import {UploadService} from "../../../data/providers/upload/upload.service";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  @Input('event') event: Event;
  @Input('type') type: string; // edit or create

  @ViewChild('eventImage') eventImage: ElementRef;
  eventPosted : boolean = false;
  form: FormGroup;
  isFree = true;
  imageError = false;
  eventMinDate: string;

  media: Media[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
    private mediaService: MediaService,
    private uploadService: UploadService
  ) {
    this.form = this.formBuilder.group({
      medias: this.formBuilder.array([
        this.formBuilder.control('', Validators.required)
      ]),
      name: ['', [Validators.required]],
      date: ['', Validators.required],
      duration: this.formBuilder.group({
        length: ['', Validators.required],
        unit: ['', Validators.required]
      }),
      location: this.formBuilder.group({
        name: ['', Validators.required]
      }),
      isFree: [true, Validators.required],
      price: this.formBuilder.group({
        amount: [0],
        currency: ['X']
      }),
      description: ['', [Validators.required,Validators.minLength(20)]],
      artists: this.formBuilder.array([]),
      tags: this.formBuilder.array([])
    });

    if(this.type === 'edit' && this.event){
      this.form.setValue(this.event);
    }
  }

  ngOnInit() {
    let now = new Date();
    this.eventMinDate = now.toISOString();

    console.log('Event Form', this.type);
  }

  createEvent() {

    console.log(this.form.value);

    let event: Event = this.form.value;

    event.creator = this.authService.getUserFromToken();

    let attendance: Attendance = {
      user: this.authService.getUserId(),
      attendanceType: 1
    };

    event.attendance = [attendance];

    this.eventService
      .post(event)
      .subscribe(
        message => {
          this.router.navigate(['/feed']);
          this.eventPosted = true;
        },
        error => {
          this.handleError(error)
        }
      );

  }


  async presentAlert(errMessage ,backendError : boolean) {
    let alert;
    if(backendError){
      alert = await this.alertController.create({
        header: 'Wait..',
        subHeader: 'You could not create the event.',
        message: 'You get a backend error: ' + errMessage,
        buttons: ['Close']
      });
    }else{
      alert = await this.alertController.create({
        header: 'Wait..',
        subHeader: 'You could not create the event.',
        message: 'You get a client error: ' + errMessage,
        buttons: ['Close']
      });
    }
    await alert.present();
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      this.presentAlert(error.error.message,false);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      this.presentAlert(`${JSON.stringify(error.error)}`, true);
    }
  }
  onImageError(){
    this.imageError = true;
    (<HTMLImageElement> this.eventImage.nativeElement).src= '../../../../assets/placeholder.png';
  }
  onImageLoad(){
    this.imageError = false;
  }
  get artists(){
    return this.form.get('artists') as FormArray;
  }
  addArtist(){
    this.artists.push(this.formBuilder.control(''));
  }
  removeArtist(index: number){
    this.artists.removeAt(index);
  }
  get tags(){
    return this.form.get('tags') as FormArray;
  }
  addTag(){
    this.tags.push(this.formBuilder.control(''));
  }
  removeTag(index: number){
    this.tags.removeAt(index);
  }
  get medias(){
    return this.form.get('medias') as FormArray;
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

}
