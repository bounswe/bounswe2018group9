import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchingUsers : boolean = false;
  tags  = new FormControl('',  [Validators.required]);
  content = new FormControl('',  [Validators.required]);
  location = new FormControl('',  [Validators.required]);
  fromTime = new FormControl('',  [Validators.required]);
  toTime = new FormControl('',  [Validators.required]);
  username = new FormControl('',  [Validators.required]);
  timeForm : FormGroup;
  constructor(private formBuilder : FormBuilder) {
    this.timeForm = this.formBuilder.group([this.fromTime,this.toTime]);
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
    alert('Searching between times:' + this.fromTime+ ' and ' + this.toTime);
  }
  search(){
    alert('searching content based');
  }
  searchUser(){
    alert('searching users');
  }
  showErrorTags(){
    alert('enter some tags first');
  }
  showErrorContent(){

  }
  showErrorLocation(){

  }
  showErrorTime(){

  }
  changeToggle(){
    this.searchingUsers = !this.searchingUsers;
    console.log(this.searchingUsers);
  }
}

