import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {SearchResult} from "../../../interfaces/search-result.interface";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  static api = '/search';
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

  advanced(){}
}
