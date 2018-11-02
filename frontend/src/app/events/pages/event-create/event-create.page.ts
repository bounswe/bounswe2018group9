import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EventService } from '../../../data/providers/event/event.service';

import {LoadingComponent} from "../../../general/components/loading/loading.component";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.page.html',
  styleUrls: ['./event-create.page.scss'],
})
export class EventCreatePage implements OnInit {
  form: FormGroup;
  loadingComponent : LoadingComponent = new LoadingComponent(new LoadingController());

  constructor(private formBuilder: FormBuilder, private eventService: EventService, private router: Router) {
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
    /*console.log(this.form.value);
    console.log(localStorage.getItem('token'));*/

    this.loadingComponent.presentLoading(10000);
    this.eventService
      .post(this.form.value)
      .subscribe(
        message => {
          this.router.navigate(['feed']);
        },
        error => {
          console.log(error);
        },() => {
          this.loadingComponent.loadingController.dismiss();
        }
      );
  }
}
