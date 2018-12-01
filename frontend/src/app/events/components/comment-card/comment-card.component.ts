import { Component, OnInit, Input, Output } from '@angular/core';

import { Comment, Vote } from '../../../interfaces/';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {
  @Input('vote') vote: Vote;
  @Input('comment') comment: Comment;

  constructor() {

  }

  ngOnInit() {

  }

}
