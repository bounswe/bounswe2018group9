import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class DataService<T> {
  protected api = '';

  constructor(protected http: HttpClient) { }

  private path(id: string = '') {
    return '/' + this.api + '/' + id;
  }

  get(id: string = '', params: { limit?: number, skip?: number, search?: string } = {}): Observable<T | T[]> {
    if (!id) id = '';

    let options = {
      params: new HttpParams()
    };
    for (let param in params) options.params = options.params.set(param, params[param]);

    return this.http.get<T | T[]>(this.path(id), options);
  }

  post(data: T): Observable<T> {
    return this.http.post<T>(this.path(), data);
  }

  put(id: string, data: T): Observable<T> {
    return this.http.put<T>(this.path(id), data);
  }

  delete(id: string): Observable<{}> {
    return this.http.delete(this.path(id));
  }
}
