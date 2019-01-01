import { Component } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';

import { TagService } from '../../../data/providers/tag/tag.service';

@Component({
  selector: 'app-tag-selector',
  templateUrl: './tag-selector.component.html',
  styleUrls: ['./tag-selector.component.scss']
})
export class TagSelectorComponent {
  tags: string[] = [];
  selected: string[] = [];

  constructor(private navParams: NavParams, private popoverController: PopoverController, private tagService: TagService) {
    this.selected = this.navParams.get('selected') || [];
    this.tagService.get().subscribe((tags: string[]) => {
      this.tags = tags;
    });
  }

  toggle(event, tag) {
    if (event.detail.checked && this.selected.indexOf(tag) < 0) {
      this.selected.push(tag);
    } else if (this.selected.indexOf(tag) >= 0) {
      this.selected.splice(this.selected.indexOf(tag), 1);
    }
  }

  checked(tag) {
    return this.selected.indexOf(tag) >= 0;
  }

  save() {
    this.popoverController.dismiss(this.selected);
  }
}