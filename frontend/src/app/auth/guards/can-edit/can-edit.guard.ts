import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {EventService} from "../../../data/providers/event/event.service";
import {AuthService} from "../../providers/auth/auth.service";
import {Event} from "../../../interfaces";

@Injectable({
  providedIn: 'root'
})
export class CanEditGuard implements CanActivate {
  constructor(private eventService: EventService,
              private authService: AuthService,
              private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let eventId = next.params['id'];
    let cachedEvent = this.eventService.getCachedEvent(eventId);
    if(cachedEvent !== null){
      if(cachedEvent.creator === this.authService.getUserId()){
        return true;
      }else{
        this.router.navigate(['feed', eventId]);
        return false;
      }
    }
    const observable = new Observable<boolean>((observer) => {
      this.eventService.get(eventId)
        .subscribe(
          (event: Event) => {
            if(event.creator === this.authService.getUserId()){
              observer.next(true);
            } else {
              this.router.navigate(['feed', eventId]);
              observer.next(false);
            }
          },
          error => {
            console.log('An error occurred getting event on can-edit guard', error);
            observer.next(false);
          }
        );
    });
    return observable;
  }
}
