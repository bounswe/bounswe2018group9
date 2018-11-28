import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../providers/auth/auth.service';
import {AlertController, LoadingController} from "@ionic/angular";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['../../auth.module.scss', './signin.page.scss'],
})
export class SigninPage implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute,
              private authService: AuthService, private loadingController : LoadingController,
              private alertController: AlertController) {
    this.form = this.formBuilder.group(
      {
        email: ['',  [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]]
      }
    );
  }

  ngOnInit() {
  }

  login() {
    this.presentLoading();

    this.authService
      .login(this.form.value)
      .subscribe(response => {
        this.route.queryParams
          .subscribe(params => {
            this.loadingController.dismiss();
            this.router.navigate([ ( params['return'], '/feed' ) ]);
          });
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
        message: 'Your username or password was not correct.',
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
