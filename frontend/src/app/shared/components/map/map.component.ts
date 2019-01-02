import { Inject, Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LatLng, AgmMarker, MapsAPILoader } from '@agm/core';

import { Location as Loc } from '../../../interfaces';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  static options = {
    center: {
      lat: 41.085587,
      lng: 29.044715
    },
    zoom: 15,
    search: true,
    select: true
  };

  @Input('options') options;
  @Input('locations') locations: Loc[];

  @Output('onSelectMarker') onSelectMarker = new EventEmitter<number>();
  @Output('onSelectLocation') onSelectLocation = new EventEmitter<Loc>();

  @ViewChild('search', { read: ElementRef }) search: ElementRef;
  @ViewChild('select') select: AgmMarker;

  position: Loc = {
    coords: MapComponent.options.center,
    address: 'Lounge, BM, Kuzey Kampüs, Boğaziçi Üniversitesi'
  };

  constructor(private platform: Platform, private geolocation: Geolocation, private mapsAPILoader: MapsAPILoader) { }

  ngOnInit() {
    this.setOptions();

    this.platform.ready().then(() => {
      this.geolocation.getCurrentPosition().then((response) => {
        this.setPosition({
          lat: response.coords.latitude,
          lng: response.coords.longitude
        });
      }).catch((error) => {
        this.setPosition(this.options.center);
        console.log('Geolocation error: ' + error);
      });
    });
  }

  ngOnChanges() {
    this.setOptions();
  }

  ngAfterViewInit() {
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        this.search.nativeElement.querySelector('.searchbar-input'),
        { types: ['address'] }
      );
      autocomplete.addListener('place_changed', () => {
         // get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        // verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        let coords = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        this.setPosition(coords, place.formatted_address);
      });
    });
  }

  private setOptions() {
    this.options = { ...MapComponent.options, ...this.options };
  }

  private setPosition(coords, address = null) {
    this.position.coords = coords;
    this.options.center = this.position.coords;

    if (!address) {
      this.position.address = 'Loading...';

      this.mapsAPILoader.load().then(() => {
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: coords }, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            let result = results[0];
            this.position.address = result.formatted_address;
          } else {
            this.position.address = 'Couldn\'t geocode location';
          }
          this.onSelectLocation.emit(this.position);
        });
      });
    } else {
      this.onSelectLocation.emit(this.position);
    }
  }

  onSelectDrag(event) {
    this.setPosition(event.coords);
  }

  onMapClick(event) {
    this.setPosition(event.coords);
  }

  onMarkerClick(marker) {
    this.onSelectMarker.emit(parseInt(marker._id));
  }
}
