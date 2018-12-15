import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class UploadService {
  static api = '/upload';

  constructor(@Inject('RESOURCE') private resource: string, private http: HttpClient) {}

  getUrl(resource: string): string {
    return this.resource + '/' + resource;
  }

  upload(file: File, body?: { [key: string]: string }): { progress: Observable<number>, response: Observable<HttpResponse<any>> } {
    const formData: FormData = new FormData();
      formData.append('file', file, file.name); // add file

      if (body) { // add body
        for (let key in body) formData.append(key, body[key]);
      }

      const req = new HttpRequest('POST', UploadService.api, formData, {
        reportProgress: true
      });
      const progress = new Subject<number>();
      const response = new Subject<HttpResponse<any>>();

      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          // update progress
          const percentDone = Math.round(100 * event.loaded / event.total);
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {
          // complete progress
          progress.complete();

          // send response
          response.next(event);
          response.complete();
        }
      }, error => {
        // complete progress
        progress.complete();

        // send error
        response.error(error);
        response.complete();
      });

      return { progress: progress, response: response };
  }
}