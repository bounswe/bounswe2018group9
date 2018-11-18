import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EventService } from '../../../../data/providers/event/event.service';

import {AlertController, LoadingController} from "@ionic/angular";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.page.html',
  styleUrls: ['./event-create.page.scss'],
})
export class EventCreatePage implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private eventService: EventService, private router: Router,
              private loadingController :LoadingController, private alertController: AlertController) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      price: ['', [Validators.required,Validators.pattern('[0-9₺$€]*')]],
      owner: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      description: ['', [Validators.required,Validators.minLength(20)]],
      date: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  createEvent() {
    this.presentLoading();

    this.eventService
      .post(this.form.value)
      .subscribe(
        message => {
          this.router.navigate(['/feed']);
          this.loadingController.dismiss();
        },
        error => {
          console.log(error);
          this.loadingController.dismiss();
        }
      );
  }

  async presentLoading(){
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 10000
    });
    return await loading.present();
  }

}
