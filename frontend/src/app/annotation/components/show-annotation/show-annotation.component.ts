import { Component, OnInit } from '@angular/core';
import {NavParams} from '@ionic/angular';
import {HighlightTag} from 'angular-text-input-highlight';

@Component({
  selector: 'app-show-annotation',
  templateUrl: './show-annotation.component.html',
  styleUrls: ['./show-annotation.component.scss']
})
export class ShowAnnotationComponent implements OnInit {

  annotationClicked : HighlightTag;

  constructor(private navParams : NavParams) { }

  ngOnInit() {
   this.annotationClicked  = this.navParams.get('annotationClicked');
  }

}
