import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class DataService<T> {
  protected options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  protected api = '';

  constructor(@Inject('ENDPOINT') protected endpoint: string,  protected http: HttpClient) { }

  private path(id: string = '') {
    return 'https://' + this.endpoint + '/api/' + this.api + '/' + id;
  }

  get(id: string = '', params: { limit?: number, skip?: number, search?: string } = {}): Observable<T | T[]> {
    if (!id) id = '';

    let options = {
      params: new HttpParams()
    };
    for (let param in params) options.params = options.params.set(param, params[param]);

    return this.http.get<T | T[]>(this.path(id), Object.assign(options, this.options));
  }

  post(data: T): Observable<T> {
    return this.http.post<T>(this.path(), data, this.options);
  }

  put(id: string, data: T): Observable<T> {
    return this.http.put<T>(this.path(id), data, this.options);
  }

  delete(id: string): Observable<{}> {
    return this.http.delete(this.path(id), this.options);
  }
}