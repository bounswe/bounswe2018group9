import { Component, OnInit, OnChanges, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { Media } from '../../../interfaces';

import { MediaService } from '../../../native/providers/media/media.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit, OnChanges {
  static options = {
    slides: 1,
    empty: {
      key: 'add',
      icon: 'add-circle-outline'
    },
    buttons: [
      {
        key: 'add',
        icon: 'add-circle-outline'
      },
      {
        key: 'remove',
        icon: 'remove-circle-outline'
      }
    ]
  };

  @ViewChild('slides') slides: any;

  @Input('media') media: Media[] = [ ];
  @Input('options') options;
  opts: any;

  @Output('onEvent') onEvent = new EventEmitter<{ key: string, slide: number }>();

  constructor() { }

  ngOnInit() {
    this.setOptions();
  }

  ngOnChanges() {
    this.setOptions();
    this.slides.update();
  }

  private setOptions() {
    this.options = { ...MediaComponent.options, ...this.options };

    this.opts = {
      grabCursor: true,
      slidesPerView: this.options.slides
    };
  }

  async on(key: string, index: number = -1) {
    let slide = index === -1 ? await this.slides.getActiveIndex() : index;
    this.onEvent.emit({key: key, slide: slide});
  }
}
