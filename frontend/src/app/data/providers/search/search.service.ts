import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Injectable} from "@angular/core";
import {SearchParams, Event, SearchResult} from "../../../interfaces/";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  static api = '/search';
  static apiAdvanced = '/search/advanced';
  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(protected http: HttpClient) {}

  get(searchQuery: string): Observable<SearchResult>{
    let params = new HttpParams().set('search', searchQuery);
    return this.http.get<SearchResult>(SearchService.api, {params: params, ...this.options})
  }

  advanced(params: SearchParams): Observable<Event[]>{
    let options = {
      params: new HttpParams()
    };
    for (let param in params) {
      if(params[param] !== '') options.params = options.params.set(param, params[param]);
    }

    return this.http.get<Event[]>(SearchService.apiAdvanced, { ...this.options, ...options });
  }
}
