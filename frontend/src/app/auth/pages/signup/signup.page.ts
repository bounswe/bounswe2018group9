import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import {LoadingController, NavController} from '@ionic/angular';

import { AuthService } from '../../providers/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private loadingController :LoadingController) {
    this.form = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required]
      }
    );
  }

  ngOnInit() {
  }

  register() {
    this.presentLoading();
    this.authService.register(this.form.value,()=> this.loadingController.dismiss());
  }
  async presentLoading(){
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 10000
    });
    return await loading.present();
  }
}
