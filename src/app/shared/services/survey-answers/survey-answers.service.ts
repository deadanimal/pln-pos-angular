import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { SurveyAnswer } from './survey-answers.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyAnswersService {

  // URL
  public url: string = environment.baseUrl + 'v1/survey-answers/'

  // Data
  public surveyAnswers: SurveyAnswer[] = []

  constructor(
    private http: HttpClient
  ) { }

  post(body): Observable<SurveyAnswer> {
    return this.http.post<SurveyAnswer>(this.url, body).pipe(
      tap((res) => {
        console.log('Survey answer: ', res)
      })
    )
  }

  get(): Observable<SurveyAnswer[]> {
    return this.http.get<SurveyAnswer[]>(this.url).pipe(
      tap((res) => {
        this.surveyAnswers = res
        console.log('Survey answers: ', res)
      })
    )
  }

  update(body: Form, id: string): Observable<SurveyAnswer>  {
    let urlPatch = this.url + id + '/'
    return this.http.patch<SurveyAnswer>(urlPatch, body).pipe(
      tap((res) => {
        console.log('Survey answer: ', res)
      })
    )
  }

  delete(id: string): Observable<SurveyAnswer> {
    let urlDelete = this.url + id + '/'
    return this.http.delete<SurveyAnswer>(urlDelete).pipe(
      tap((res) => {
        console.log('Survey answer: ', res)
      })
    )
  }

}
