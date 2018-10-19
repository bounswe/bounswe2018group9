import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.interface';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  activeUser: User;

  constructor(private backend: BackendService) { }

  ngOnInit() {
    this.activeUser = this.backend.getUser();
  }

}
