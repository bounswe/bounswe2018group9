import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.page.html',
  styleUrls: ['./user-search.page.scss'],
})
export class UserSearchPage implements OnInit {

  form : FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group(
      {
        name: ['',  [Validators.required,]],
      }
    );
  }

  ngOnInit() {
  }

  search(){

  }

}
