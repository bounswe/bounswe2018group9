import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Event} from "../../../interfaces/index";
import {Router} from "@angular/router";
import {EventService} from "../../../data/providers/event/event.service";
import {AuthService} from "../../../auth/providers/auth/auth.service";

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input('event') event: Event;
  @Input('view') view = false;
  @ViewChild('eventImage') eventImage: ElementRef;
  timeDiff;
  timeDiffUnit;
  timeDiffText = 'ago';
  upVoted = false;
  downVoted = false;

  constructor(private router: Router,
              private eventService: EventService,
              private authService: AuthService) { }

  ngOnInit() {
    this.calculateTimeDiff();

    let userId = this.authService.getUserId();
    if(this.event.vote.positive.includes(userId)){
      this.upVoted = true;
    }
    if(this.event.vote.negative.includes(userId)){
      this.downVoted = true;
    }
  }

  /**
   * Calculate time difference text
   */
  calculateTimeDiff() {
    let now = new Date();
    let eventCreated = new Date(this.event.date);

    let timeDiff_ms = now.getTime() - eventCreated.getTime();

    if(timeDiff_ms < 0){
      timeDiff_ms = -timeDiff_ms;
      this.timeDiffText = 'remains';
    }

    let timeDiff_m = timeDiff_ms / (60*1000);
    let timeDiff_h = timeDiff_ms / (60*60*1000);
    let timeDiff_d = timeDiff_ms / (24*60*60*1000);

    if(timeDiff_m < 60){
      this.timeDiff = timeDiff_m;
      this.timeDiffUnit = 'm';
    } else if(timeDiff_h < 24){
      this.timeDiffUnit = 'h';
      this.timeDiff = timeDiff_h;
    } else{
      this.timeDiffUnit = 'd';
      this.timeDiff = timeDiff_d;
    }

    this.timeDiff = Math.floor(this.timeDiff);
  }

  vote(event, vote: number){
    event.stopPropagation();

    this.eventService.vote(this.event._id, vote === 1, this.authService.getUserId())
      .subscribe(
        message => {
          console.log(message);
          if(vote == 1 && !this.upVoted){
            this.event.vote.upvoteCount += 1;
            this.event.vote.positive.push(this.authService.getUserId());
            this.upVoted = true;
          } else if(vote == -1 && !this.downVoted){
            this.event.vote.downvoteCount -= 1;
            this.downVoted = true;
            this.event.vote.negative.push(this.authService.getUserId());
          }
        },
        error => console.log(error)
      );
  }

  goComments($event){
    event.stopPropagation();
    this.router.navigate(['feed', this.event._id], {fragment: 'comments'});
  }

  isUndefined(val) { return typeof val === 'undefined'; }

  onImageError(){
    (<HTMLImageElement>this.eventImage.nativeElement).src = '../../../../assets/placeholder.png';
  }

}
