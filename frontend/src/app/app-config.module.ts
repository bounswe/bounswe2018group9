import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

@NgModule({
  providers: [
    { provide: 'ENDPOINT', useValue: environment.endpoint }
  ]
})
export class AppConfigModule { }