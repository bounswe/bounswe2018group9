import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/providers/auth/auth.service";
import {User} from "../../../interfaces";

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss']
})
export class CommentBoxComponent implements OnInit {
  @Input('comment') comment;
  user: User;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log(this.comment);
    this.authService.getUserData(this.comment.author)
      .subscribe(
        user => {
          this.user = user;
        },
        error => {
          console.log(error);
        }
      )
  }

  isUndefined(val) { return typeof val === 'undefined'; }
}
