import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../providers/auth/auth.service';
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private authService: AuthService, private loadingController : LoadingController) {
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
