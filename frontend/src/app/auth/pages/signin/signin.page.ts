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
        this.loadingController.dismiss();
        this.route.queryParams
          .subscribe(params => {
            this.router.navigate([ ( params['return'], '/feed' ) ]);
          });

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
