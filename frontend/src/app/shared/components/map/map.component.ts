import { Inject, Component, OnInit, ViewChild } from '@angular/core';

import { Platform } from '@ionic/angular';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
  GoogleMapsEvent,
  GoogleMapsAnimation,
  Marker,
  MyLocation,
  Environment
} from '@ionic-native/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: GoogleMap;
  mapReady: boolean = false;

  constructor(@Inject('GOOGLE_API_KEY') private key: string, private platform: Platform) { }

  async ngOnInit() {
    await this.platform.ready();
    await this.load();
  }

  load() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': this.key,
      'API_KEY_FOR_BROWSER_DEBUG': this.key
    });

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 41.085587,
           lng: 29.044715
         },
         zoom: 18,
         tilt: 30
       }
    };

    this.map = GoogleMaps.create('map', mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.mapReady = true;

      this.map.getMyLocation()
        .then((location: MyLocation) => {

          this.map.animateCamera({
            target: location.latLng
          });

          let marker: Marker = this.map.addMarkerSync({
            position: location.latLng,
            animation: GoogleMapsAnimation.BOUNCE
          });
        });
    });
  }
}
