import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  fitOnes : string[] = [];
  interests : string[] = [
    'Movie'
    ,'Music'
    ,'Jazz'
    ,'Biennial'
    ,'Theater'
    ,'Exhibition'
    ,'Modern Art'
    ,'Art Movie'
    ,'Photography'
    ,'Travel'
    ,'Festival'
    ,'Museum'
    ,'Workshop'
    ,'Ballet'
    ,'Dance'
    ,'Classical Music'
    ,'Opera'
    ,'Blues'
    ,'Turkish Folk Music'
    ,'Concert'
  ];
  selectedTags : string[] = [];
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
    alert('searching semantically, tags: '+ this.selectedTags);
  }
  searchLocation(){
    alert('searching locationally, location is: ' + this.location.value);
  }
  searchTime(){
    alert('Searching between times: ' + this.fromTime.value+ ' and ' + this.toTime.value);
  }
  search(){
    alert('searching content based, content: '+ this.content.value);
  }
  searchUser(){
    alert('searching users, username is: ' + this.username.value);
  }
  updateFitOnes(){
    this.fitOnes = this.interests.filter(value => value.toLowerCase().startsWith(this.tags.value.toString().toLowerCase()));
  }
  addToSelected(newTag : string){
    if(!this.selectedTags.includes(newTag))this.selectedTags.push(newTag);
  }
  removeSelectedTag(toBeRemoved :string){
    if(this.selectedTags.includes(toBeRemoved)){
      this.selectedTags.splice(this.selectedTags.indexOf(toBeRemoved),1);
    }
  }
}

