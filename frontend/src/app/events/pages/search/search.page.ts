import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { formatDate } from '@angular/common';

import { NavParams, PopoverController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

import { TagService } from '../../../data/providers/tag/tag.service';
import { SearchService } from '../../../data/providers/search/search.service';
import { Event, Location as Loc, SearchParams } from '../../../interfaces/';

import { TagSelectorComponent } from '../../components/tag-selector/tag-selector.component';
import { DateSelectorComponent } from '../../components/date-selector/date-selector.component';
import { PriceSelectorComponent } from '../../components/price-selector/price-selector.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  name: string = '';
  filters: any = {
    date: false,
    price: false,
    location: false,
    tags: false,
  };

  boundary: any = null;
  mapChanged: boolean = true;

  locations: Loc[] = [];
  events: Event[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private popoverController: PopoverController,
    private toastController: ToastController,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    if (this.route.snapshot.params['text']) {
      this.name = this.route.snapshot.params['text'];
      this.search();
    }
  }

  parseDate(date) {
    const formatting = 'hh:mm, dd MMMM yyyy'
    return formatDate(date, formatting, 'en');
  }

  date() {
    var res;
    if (this.filters.date.after && this.filters.date.before) {
      res = 'Between ' + this.parseDate(this.filters.date.after) + ' and ' + this.parseDate(this.filters.date.before);
    } else if (this.filters.date.after) {
      res = 'After ' + this.parseDate(this.filters.date.after);
    } else if (this.filters.date.before) {
      res = 'Before ' + this.parseDate(this.filters.date.before);
    }
    return res;
  }

  price() {
    var res;
    if (this.filters.price.min && this.filters.price.max) {
      res = this.filters.price.min + ' - ' + this.filters.price.max;
    } else if (this.filters.prices.min) {
      res = '> ' + this.filters.price.min;
    } else if (this.filters.prices.max) {
      res = '< ' + this.filters.price.max;
    }
    return res + (this.filters.price.currency ? ' ' + this.filters.price.currency : '');
  }

  search() {
    let params: SearchParams = {};

    if (this.name) {
      params.search = this.name;
    }
    if (this.filters.date) {
      if (this.filters.date.after) {
        params.afterThan = this.filters.date.after;
      }
      if (this.filters.date.before) {
        params.beforeThan = this.filters.date.before;
      }
    }
    if (this.filters.price) {
      if (this.filters.price.currency) {
        params.currency = this.filters.price.currency;
      }
      if (this.filters.price.min) {
        params.lowPrice = this.filters.price.min;
      }
      if (this.filters.price.max) {
        params.highPrice = this.filters.price.max;
      }
    }
    if (this.filters.location) {
      params.latLower = this.filters.location.leftBottom.lat;
      params.latHigher = this.filters.location.rightTop.lat;
      params.lngLower = this.filters.location.leftBottom.lng;
      params.lngHigher = this.filters.location.rightTop.lng;
    }
    if (this.filters.tags && this.filters.tags.length > 0) {
      params.tags = this.filters.tags;
    }

    this.searchService.advanced(params)
      .subscribe((events: Event[]) => {
        console.log(this.events);
        this.events = events;
        this.locations = this.events.map((event) => {
          return event.location;
        });
      });
  }

  searchLocation() {
    this.mapChanged = false;
    this.filters.location = this.boundary;
    this.search();
  }

  async filter(filter: string) {
    if (this.filters[filter]) {
      this.filters[filter] = null;
      return;
    }

    if (filter == 'date') {
      let popover = await this.popoverController.create({
        backdropDismiss: true,
        component: DateSelectorComponent,
        cssClass: 'popover'
      });
      popover.onDidDismiss().then((event) => {
        this.filters.date = event.data;
      });
      return await popover.present();
    } else if (filter == 'price') {
      let popover = await this.popoverController.create({
        backdropDismiss: true,
        component: PriceSelectorComponent,
        cssClass: 'popover'
      });
      popover.onDidDismiss().then((event) => {
        this.filters.price = event.data;
      });
      return await popover.present();
    } else if (filter == 'location') {
      let toast = await this.toastController.create({
        message: 'Use map to search desired locations',
        duration: 2000,
        position: 'bottom',
        showCloseButton: true
      });
      await toast.present();
    }
  }

  async addTag() {
    let popover = await this.popoverController.create({
      backdropDismiss: true,
      component: TagSelectorComponent,
      componentProps: { selected: this.filters.tags ? this.filters.tags : [] },
      cssClass: 'popover'
    });
    popover.onDidDismiss().then((event) => {
      this.filters.tags = event.data;
    });
    return await popover.present();
  }

  removeTag(tag: string) {
    this.filters.tags.splice(this.filters.tags.indexOf(tag), 1);
  }

  onBoundaryChange(boundary) {
    this.mapChanged = true;
    this.boundary = boundary;
  }
}
