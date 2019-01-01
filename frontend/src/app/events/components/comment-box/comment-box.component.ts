import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../../auth/providers/auth/auth.service";
import {User} from "../../../interfaces";
import {UploadService} from "../../../data/providers/upload/upload.service";

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss']
})
export class CommentBoxComponent implements OnInit {
  @ViewChild('profileImage') profileImage;
  @Input('comment') comment;
  user: User;
  constructor(private authService: AuthService,
              public uploadService: UploadService) { }

  ngOnInit() {
    console.log(this.comment);
    this.authService.getUserData(this.comment.author)
      .subscribe(
        user => {
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
