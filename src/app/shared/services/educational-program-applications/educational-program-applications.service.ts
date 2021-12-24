import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { EducationalProgramApplication } from './educational-program-applications.model';

@Injectable({
  providedIn: 'root'
})
export class EducationalProgramApplicationsService {

  // URL
  public url: string = environment.baseUrl + 'v1/educational-program-applications/'

  // Data
  public educationalProgramApplications: EducationalProgramApplication[] = []

  constructor(
    private http: HttpClient
  ) { }

  post(body): Observable<EducationalProgramApplication> {
    return this.http.post<EducationalProgramApplication>(this.url, body).pipe(
      tap((res) => {
        console.log('Educational program application: ', res)
      })
    )
  }

  get(): Observable<EducationalProgramApplication[]> {
    return this.http.get<EducationalProgramApplication[]>(this.url).pipe(
      tap((res) => {
        this.educationalProgramApplications = res
        console.log('Educational program applications: ', res)
      })
    )
  }

  update(body, id: string): Observable<EducationalProgramApplication>  {
    let urlPatch = this.url + id + '/'
    return this.http.patch<EducationalProgramApplication>(urlPatch, body).pipe(
      tap((res) => {
        console.log('Educational program application: ', res)
      })
    )
  }

  delete(id: string): Observable<EducationalProgramApplication> {
    let urlDelete = this.url + id + '/'
    return this.http.delete<EducationalProgramApplication>(urlDelete).pipe(
      tap((res) => {
        console.log('Educational program application: ', res)
      })
    )
  }

}
