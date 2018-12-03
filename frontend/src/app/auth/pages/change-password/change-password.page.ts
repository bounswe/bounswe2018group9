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
   userId: string;
   constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.form = this.formBuilder.group(
      {
        password: ['', Validators.required],
        againPassword: ['', Validators.required]
      }
    );
  }
   ngOnInit() {
  }
   changePassword(){
     let data = {
       userId: this.userId,
       password: this.form.value['password'],
       againPassword: this.form.value['againPassword']
       };
    this.authService.changePassword(data);
  }
 }
