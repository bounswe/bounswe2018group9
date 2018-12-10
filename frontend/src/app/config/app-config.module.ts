import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { InterceptorService } from './interceptor.provider';

@NgModule({
  providers: [
    { provide: 'ENDPOINT', useValue: environment.endpoint },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ]
})
export class AppConfigModule { }