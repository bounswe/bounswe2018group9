import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EventService } from '../../../data/providers/event/event.service';

import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.page.html',
  styleUrls: ['./event-create.page.scss'],
})
export class EventCreatePage implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private eventService: EventService, private router: Router,private loadingController :LoadingController) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      owner: ['', Validators.required],
      description: ['', Validators.required],
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
          this.router.navigate(['feed']);
        },
        error => {
          console.log(error);
        },() => {
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
