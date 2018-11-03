import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from '../../providers/auth/auth.service';
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,private loadingController : LoadingController) {
    this.form = this.formBuilder.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required]
      }
    );
  }

  ngOnInit() {
  }

  login() {
    this.presentLoading();
    this.authService.login(this.form.value,()=> this.loadingController.dismiss());
  }
  async presentLoading(){
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 10000
    });
    return await loading.present();
  }

}
