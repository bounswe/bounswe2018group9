import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { NavController } from '@ionic/angular';

import { AuthService } from '../../providers/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  private form: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required]
      }
    );
  }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.form.value);
  }
}
