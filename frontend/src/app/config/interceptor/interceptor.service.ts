import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(@Inject('ENDPOINT') private endpoint: string) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const req = request.clone({
      url: this.endpoint + request.url,
      headers: request.headers.set('Content-Type', 'application/json')
    });

    return next.handle(req).pipe(
      tap(
        (response: HttpResponse<any>) => {
        },
        (error: HttpErrorResponse) => {
          console.log('API call error:');
          console.log(error);
        }
      )
    );
  }
}
