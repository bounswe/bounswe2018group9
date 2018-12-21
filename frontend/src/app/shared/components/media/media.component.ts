import { Component, OnInit, Input } from '@angular/core';

import { Media } from '../../../interfaces';

import { UploadService } from '../../../data/providers/upload/upload.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
  static options = {
    online: true
  };

  @Input('media') media: Media;
  @Input('options') options: { online?: boolean }

  constructor(private uploadService: UploadService) { }

  ngOnInit() {
    this.setOptions();
  }

  ngOnChanges() {
    this.setOptions();
  }

  private setOptions() {
    this.options = { ...MediaComponent.options, ...this.options };
  }

  source(): string {
    if (this.options.online) {
      return this.uploadService.getUrl(this.media.source);
    }
    return this.media.source;
  }
}
