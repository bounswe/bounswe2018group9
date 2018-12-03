import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
 import { AuthService } from '../../providers/auth/auth.service';
 @Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['../../auth.module.scss','./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
   form: FormGroup;
   constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required,Validators.email]]
      }
    );
  }
   ngOnInit() {
  }
   forgotPassword(){
     this.authService.forgotPassword(this.form.value);
  }
 }
