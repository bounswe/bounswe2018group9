import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import {LoadingController, NavController} from '@ionic/angular';

import { AuthService } from '../../providers/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['../../auth.module.scss', './signup.page.scss'],
})
export class SignupPage implements OnInit {
  form: FormGroup;


  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private loadingController :LoadingController) {
    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required]
      }
    );
  }

  ngOnInit() {
  }

  register() {
    this.presentLoading();

    this.authService
      .register(this.form.value)
      .subscribe(response => {
        this.loadingController.dismiss();
        this.router.navigate(['/signin']);
      }, error => {
        this.loadingController.dismiss();
        // TODO: Handle error
      });
  }

  async presentLoading(){
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 10000
    });
    return await loading.present();
  }
}
