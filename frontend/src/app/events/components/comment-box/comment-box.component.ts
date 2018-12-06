import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../interfaces";
import {UserService} from '../../../data/providers/user/user.service';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss']
})
export class CommentBoxComponent implements OnInit {
  @ViewChild('profileImage') profileImage;
  @Input('comment') comment;
  user: User;
  constructor(private userService: UserService) { }

  ngOnInit() {
    console.log(this.comment);
    this.userService.get(this.comment.author)
      .subscribe(
        (user : User) => {
          this.user = user;
          console.log(user);
        },
        error => {
          console.log(error);
        }
      )
  }

  isUndefined(val) { return typeof val === 'undefined'; }

  onProfileImageError(element){
    (<HTMLImageElement>this.profileImage.nativeElement).src = '../../../../assets/profile.jpg';
  }
}
