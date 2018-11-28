import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../providers/auth/auth.service';
 @Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['../../auth.module.scss', './change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
   form: FormGroup;
   constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.form = this.formBuilder.group(
      {
        password: ['', Validators.required]
      }
    );
  }
   ngOnInit() {
  }
   changePassword(){
    this.authService.changePassword(this.form.value);
  }
 }