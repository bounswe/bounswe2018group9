import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import {AlertController, LoadingController} from '@ionic/angular';

import { AuthService } from '../../providers/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['../../auth.module.scss', './signup.page.scss'],
})
export class SignupPage implements OnInit {
  form: FormGroup;


  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService
              , private loadingController :LoadingController, private alertController : AlertController) {
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.pattern('[ a-zA-Z]*')]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required,Validators.minLength(8)]]
      }
    );
  }

  ngOnInit() {

  }

  register() {
    this.presentLoading();
    let data = { userDetails: {name: this.form.value['name']}, email: this.form.value['email'], password: this.form.value['password'] };
    this.authService
      .register(data)
      .subscribe(response => {
        this.router.navigate(['/signin']);
        this.loadingController.dismiss();
      }, error => {
        console.log(error);
        this.loadingController.dismiss();
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
