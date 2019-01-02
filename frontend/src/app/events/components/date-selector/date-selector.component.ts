import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss']
})
export class DateSelectorComponent implements OnInit {
  options: any = {
    range: true,
    hours: true
  };

  date: any = {
    after: '',
    before: ''
  };

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
  }

  save() {
    if (!this.options.range) {
      this.date.before = false;
    }
    if (!this.options.hours) {
      if (this.date.after.indexOf('T') === -1) {
        this.date.after = this.date.after + 'T00:00:00Z';
      }
      if (this.date.before.indexOf('T') === -1) {
        this.date.before = this.date.before + 'T23:59:59Z';
      }
    }

    this.popoverController.dismiss(this.date);
  }
}
