import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { VisitApplication } from './visit-applications.model';

@Injectable({
  providedIn: 'root'
})
export class VisitApplicationsService {

  // URL
  public url: string = environment.baseUrl + 'v1/visit-applications/'

  // Data
  public visitApplications: VisitApplication[] = []

  constructor(
    private http: HttpClient
  ) { }

  post(body): Observable<VisitApplication> {
    return this.http.post<VisitApplication>(this.url, body).pipe(
      tap((res) => {
        console.log('Visit application: ', res)
      })
    )
  }

  get(): Observable<VisitApplication[]> {
    return this.http.get<VisitApplication[]>(this.url).pipe(
      tap((res) => {
        this.visitApplications = res
        console.log('Visit applications: ', res)
      })
    )
  }

  update(body, id: string): Observable<VisitApplication>  {
    let urlPatch = this.url + id + '/'
    return this.http.patch<VisitApplication>(urlPatch, body).pipe(
      tap((res) => {
        console.log('Visit application: ', res)
      })
    )
  }

  delete(id: string): Observable<VisitApplication> {
    let urlDelete = this.url + id + '/'
    return this.http.delete<VisitApplication>(urlDelete).pipe(
      tap((res) => {
        console.log('Visit application: ', res)
      })
    )
  }

}
