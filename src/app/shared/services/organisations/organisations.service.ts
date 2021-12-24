import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Organisation } from './organisations.model';

@Injectable({
  providedIn: 'root'
})
export class OrganisationsService {

  // URL
  public url: string = environment.baseUrl + 'v1/organisations/'

  // Data
  public organisations: Organisation[] = []

  constructor(
    private http: HttpClient
  ) { }

  post(body: Form): Observable<Organisation> {
    return this.http.post<Organisation>(this.url, body).pipe(
      tap((res) => {
        console.log('Organisation: ', res)
      })
    )
  }

  get(): Observable<Organisation[]> {
    return this.http.get<Organisation[]>(this.url).pipe(
      tap((res) => {
        this.organisations = res
        console.log('Organisations: ', res)
      })
    )
  }

  update(body: Form, id: string): Observable<Organisation>  {
    let urlPatch = this.url + id + '/'
    return this.http.patch<Organisation>(urlPatch, body).pipe(
      tap((res) => {
        console.log('Organisation: ', res)
      })
    )
  }

  delete(id: string): Observable<Organisation> {
    let urlDelete = this.url + id + '/'
    return this.http.delete<Organisation>(urlDelete).pipe(
      tap((res) => {
        console.log('Organisation: ', res)
      })
    )
  }

}
