import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import { Router } from '@angular/router';

import { EventService } from '../../../data/providers/event/event.service';

import {AlertController} from "@ionic/angular";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../auth/providers/auth/auth.service";
import {Event} from "../../../interfaces";

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

  constructor(private formBuilder: FormBuilder,
              private eventService: EventService,
              private router: Router,
              private alertController: AlertController,
              private authService: AuthService) {
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
  }

  ngOnInit() {
    let now = new Date();
    this.eventMinDate = now.toISOString();
  }

  createEvent() {

    console.log(this.form.value);

    let event: Event = this.form.value;

    event.creator = this.authService.getUserFromToken();

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
}
