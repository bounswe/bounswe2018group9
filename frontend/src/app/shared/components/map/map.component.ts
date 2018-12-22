import { Inject, Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Platform } from '@ionic/angular';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
  GoogleMapsEvent,
  GoogleMapsAnimation,
  Marker,
  MyLocation,
  ILatLng,
  Geocoder,
  GeocoderRequest,
  GeocoderResult,
  Environment
} from '@ionic-native/google-maps/ngx';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: GoogleMap;
  marker: Marker;
  mapReady: boolean = false;

  @Output('location') location = new EventEmitter<ILatLng>();

  constructor(@Inject('GOOGLE_API_KEY') private key: string, private platform: Platform) { }

  async ngOnInit() {
    await this.platform.ready();
    await this.load();
  }

  load() {
    if (!this.platform.is('mobile')) {
      Environment.setEnv({
        'API_KEY_FOR_BROWSER_RELEASE': this.key,
        'API_KEY_FOR_BROWSER_DEBUG': this.key
      });
    }

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 41.085587,
           lng: 29.044715
         },
         zoom: 18,
         tilt: 30
       },
       controls: {
         myLocation: true,
         myLocationButton: true,
         zoom: true
       }
    };

    this.map = GoogleMaps.create('map', mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.mapReady = true;

      this.map.getMyLocation()
        .then((location: MyLocation) => {
          this.map.animateCamera({
            target: location.latLng,
            duration: 0
          });

          this.marker = this.map.addMarkerSync({
            position: location.latLng,
            animation: GoogleMapsAnimation.DROP
          });
          this.location.emit(this.marker.getPosition());

          this.map.on(GoogleMapsEvent.MAP_LONG_CLICK).subscribe((data) => {
            this.marker.setPosition(data[0]);
            this.location.emit(this.marker.getPosition());

            Geocoder.geocode({ position: this.marker.getPosition() })
              .then((results: GeocoderResult[]) => {
                let address: any = [
                  results[0].subThoroughfare || "",
                  results[0].thoroughfare || "",
                  results[0].locality || "",
                  results[0].adminArea || "",
                  results[0].postalCode || "",
                  results[0].country || ""].join(", ");

                this.marker.setTitle(address);
                this.marker.showInfoWindow();
              })
          });
        })
        .catch((error) => {
          // TODO: Handle error
        });
    }).catch((error) => {
      // TODO: Handle error
    });
  }
}
