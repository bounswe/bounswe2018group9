import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.page.html',
  styleUrls: ['./event-search.page.scss'],
})
export class EventSearchPage implements OnInit {
  semanticForm : FormGroup;
  contentForm : FormGroup;
  locationForm : FormGroup;
  timeForm : FormGroup;

  constructor(private formBuilder : FormBuilder) {
    this.semanticForm = this.formBuilder.group({
      tags: ['',  [Validators.required]]
    });
    this.contentForm = this.formBuilder.group({
      content: ['',  [Validators.required]]
    });
    this.locationForm = this.formBuilder.group({
      location: ['',  [Validators.required]]
    });
    this.timeForm = this.formBuilder.group({
      time: ['',  [Validators.required]]
    });
  }

  ngOnInit() {
  }
  searchByTags(){
    alert('searching semantically');
  }
  searchLocation(){
    alert('searching locationally');
  }
  searchTime(){
    alert('searching time based');
  }
  search(){
    alert('searching content based');
  }
}
