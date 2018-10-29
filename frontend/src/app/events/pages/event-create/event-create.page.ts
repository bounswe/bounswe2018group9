import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EventService } from '../../../data/providers/event/event.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.page.html',
  styleUrls: ['./event-create.page.scss'],
})
export class EventCreatePage implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private eventService: EventService, private router: Router) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      artists: ['', Validators.required],
      date: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  createEvent() {
    this.eventService
      .post(this.form.value)
      .subscribe(
        message => {
          this.router.navigate(['feed']);
        },
        error => {
          console.log(error);
        }
      );
  }
}
