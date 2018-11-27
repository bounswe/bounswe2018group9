import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EventService } from '../../../data/providers/event/event.service';

import {AlertController, LoadingController} from "@ionic/angular";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.page.html',
  styleUrls: ['./event-create.page.scss'],
})
export class EventCreatePage implements OnInit {
  form: FormGroup;
  isFree = true;
  constructor(private formBuilder: FormBuilder, private eventService: EventService, private router: Router,
              private loadingController :LoadingController, private alertController: AlertController) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      datetime: ['', Validators.required],
      location: ['', Validators.required],
      isFree: [true, Validators.required],
      price: [0, [Validators.required,Validators.pattern('[0-9₺$€]*')]],
      description: ['', [Validators.required,Validators.minLength(20)]]
    });
  }

  ngOnInit() {
  }

  createEvent() {

    console.log(this.form.value);
    //this.presentLoading();
/*

    this.eventService
      .post(this.form.value)
      .subscribe(
        message => {
          this.router.navigate(['/feed']);
        },
        error => {
          this.handleError(error)
        },() => {
          this.loadingController.dismiss();
        }
      );
      */
  }

  async presentLoading(){
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    return await loading.present();
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
  };
}
