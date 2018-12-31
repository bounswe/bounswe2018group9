import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertController } from '@ionic/angular';

import { AuthService } from '../../../auth/providers/auth/auth.service';
import { EventService } from '../../../data/providers/event/event.service';
import { UploadService } from '../../../data/providers/upload/upload.service';
import { MediaService } from '../../../native/providers/media/media.service';

import { Attendance, Event, Media } from '../../../interfaces';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.page.html',
  styleUrls: ['./event-create.page.scss'],
})
export class EventCreatePage implements OnInit {
  @ViewChild('eventImage') eventImage: ElementRef;
  eventPosted : boolean = false;
  form: FormGroup;
  isFree = true;
  imageError = false;
  eventMinDate: string;

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
    private mediaService: MediaService,
    private uploadService: UploadService
  ) {}

  ngOnInit() {}

  createEvent(eventCreated) {

    console.log(eventCreated);
    this.eventService
      .post(eventCreated)
      .subscribe(
        (message) => {
          this.router.navigate(['feed', message.event._id]);
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
}
