import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Feedback } from './feedbacks.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbacksService {

  // URL
  public url: string = environment.baseUrl + 'v1/feedbacks/'

  // Data
  public feedbacks: Feedback[] = []

  constructor(
    private http: HttpClient
  ) { }

  post(body: Form): Observable<Feedback> {
    return this.http.post<Feedback>(this.url, body).pipe(
      tap((res) => {
        console.log('Feedback: ', res)
      })
    )
  }

  get(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.url).pipe(
      tap((res) => {
        this.feedbacks = res
        console.log('Feedbacks: ', res)
      })
    )
  }

  update(body: Form, id: string): Observable<Feedback>  {
    let urlPatch = this.url + id + '/'
    return this.http.patch<Feedback>(urlPatch, body).pipe(
      tap((res) => {
        console.log('Feedback: ', res)
      })
    )
  }

  delete(id: string): Observable<Feedback> {
    let urlDelete = this.url + id + '/'
    return this.http.delete<Feedback>(urlDelete).pipe(
      tap((res) => {
        console.log('Feedback: ', res)
      })
    )
  }

  postRating(body: Form): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'v1/ratings/', body).pipe(
      tap((res) => {
        console.log('Rating: ', res)
      })
    )
  }

  filter(field: String): Observable<Feedback[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<Feedback[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Feedbacks: ", res);
      })
    );
  }

  extended(field): Observable<Feedback[]> {
    let urlExtended = "";
    if (field) urlExtended = this.url + "extended/?" + field;
    else urlExtended = this.url + "extended";
    return this.http.get<Feedback[]>(urlExtended).pipe(
      tap((res) => {
        console.log("Feedbacks: ", res);
      })
    );
  }
}
