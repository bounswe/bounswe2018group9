import { Component, OnInit } from '@angular/core';
import {LoadingController} from "@ionic/angular";


@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor(public loadingController: LoadingController) { }

  ngOnInit() {
  }

  async presentLoading(duration : number) {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: duration
    });

    return await loading.present();
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'hide',
      duration: 5000,
      message: 'Loading...',
      translucent: true
    });
    return await loading.present();
  }



}
