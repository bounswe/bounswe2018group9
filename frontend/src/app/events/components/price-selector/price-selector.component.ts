import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-price-selector',
  templateUrl: './price-selector.component.html',
  styleUrls: ['./price-selector.component.scss']
})
export class PriceSelectorComponent implements OnInit {
  options: any = {
    range: true
  };

  price: any = {
    min: false,
    max: false,
    currency: false
  };

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
  }

  save() {
    this.popoverController.dismiss(this.price);
  }
}
