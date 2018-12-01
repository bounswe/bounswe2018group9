import { Component, OnInit, Input } from '@angular/core';

import { Media } from '../../../interfaces';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
  @Input('media') media: [Media];

  constructor() { }

  ngOnInit() {

  }

}
