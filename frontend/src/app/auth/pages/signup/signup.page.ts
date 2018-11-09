import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import {AlertController, LoadingController, NavController} from '@ionic/angular';

import { AuthService } from '../../providers/auth/auth.service';
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";

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
        name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required,Validators.minLength(8)]]
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
        this.handleError(error);
      });
  }

  async presentLoading(){
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 10000
    });
    return await loading.present();
  }
  async presentAlert(errMessage ,backendError : boolean) {
    let alert;
    if(backendError){
      alert = await this.alertController.create({
        header: 'Wait..',
        subHeader: 'You could not sign in.',
        message: 'You get a backend error: ' + errMessage,
        buttons: ['Close']
      });
    }else{
      alert = await this.alertController.create({
        header: 'Wait..',
        subHeader: 'You could not sign in.',
        message: 'You get a client error: ' + errMessage,
        buttons: ['Close']
      });
    }
    await alert.present();
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      this.presentAlert(error.error.message,false);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      this.presentAlert(`${JSON.stringify(error.error)}`, true);
    }
  };
}
