import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { InterceptorService } from './interceptor/interceptor.service';

@NgModule({
  providers: [
    { provide: 'ENDPOINT', useValue: environment.endpoint },
    { provide: 'RESOURCE', useValue: environment.resource },
    { provide: 'GOOGLE_API_KEY', useValue: environment.googleApiKey },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ]
})
export class AppConfigModule { }
