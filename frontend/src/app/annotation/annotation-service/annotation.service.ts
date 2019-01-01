import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Annotation} from '../../interfaces/annotation.interface';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {

  constructor(private http: HttpClient) {
  }
  postAnnotation(annotation : Annotation): Observable<any>{
    return this.http.post('/annotations/',annotation);
  }
  getAnnotation(id : string) : Observable<any>{
    return this.http.get('/annotations/'+id);
  }
  putAnnotation(id : string, annotation : Annotation): Observable<any>{
    return this.http.put('/annotations/'+id,annotation);
  }
  deleteAnnotation(id : string): Observable<any>{
    return this.http.delete('/annotations/'+id);
  }
  getAnnotationsByPage(url : string) : Observable<any>{
    return this.http.get('/annotations/',{params:{url: url}});
  }
}
