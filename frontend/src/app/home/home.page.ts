import { Component } from '@angular/core';
import {BackendService} from "../services/backend.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private backend: BackendService){
    this.backend.getEvents()
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      )
  }



}
