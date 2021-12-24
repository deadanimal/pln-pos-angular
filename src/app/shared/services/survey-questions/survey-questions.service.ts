import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { SurveyQuestion } from './survey-questions.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyQuestionsService {

  // URL
  public url: string = environment.baseUrl + 'v1/survey-questions/'

  // Data
  public surveyQuestions: SurveyQuestion[] = []

  constructor(
    private http: HttpClient
  ) { }

  post(body: Form): Observable<SurveyQuestion> {
    return this.http.post<SurveyQuestion>(this.url, body).pipe(
      tap((res) => {
        console.log('Survey question: ', res)
      })
    )
  }

  get(): Observable<SurveyQuestion[]> {
    return this.http.get<SurveyQuestion[]>(this.url).pipe(
      tap((res) => {
        this.surveyQuestions = res
        console.log('Survey questions: ', res)
      })
    )
  }

  update(body: Form, id: string): Observable<SurveyQuestion>  {
    let urlPatch = this.url + id + '/'
    return this.http.patch<SurveyQuestion>(urlPatch, body).pipe(
      tap((res) => {
        console.log('Survey question: ', res)
      })
    )
  }

  delete(id: string): Observable<SurveyQuestion> {
    let urlDelete = this.url + id + '/'
    return this.http.delete<SurveyQuestion>(urlDelete).pipe(
      tap((res) => {
        console.log('Survey question: ', res)
      })
    )
  }

  filter(field: string): Observable<SurveyQuestion[]> {
    let urlFilter = this.url + '?' + field;
    return this.http.get<SurveyQuestion[]>(urlFilter).pipe(
      tap((res) => {
        console.log('Survey questions: ', res)
      })
    )
  }

}
