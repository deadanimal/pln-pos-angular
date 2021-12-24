import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Venue } from './venues.model';

@Injectable({
  providedIn: 'root'
})
export class VenuesService {

  // URL
  public url: string = environment.baseUrl + 'v1/venues/'

  // Data
  public venues: Venue[] = []

  constructor(
    private http: HttpClient
  ) { }

  post(body: Form): Observable<Venue> {
    return this.http.post<Venue>(this.url, body).pipe(
      tap((res) => {
        console.log('Venue: ', res)
      })
    )
  }

  get(): Observable<Venue[]> {
    return this.http.get<Venue[]>(this.url).pipe(
      tap((res) => {
        this.venues = res
        console.log('Venues: ', res)
      })
    )
  }

  update(body: Form, id: string): Observable<Venue>  {
    let urlPatch = this.url + id + '/'
    return this.http.patch<Venue>(urlPatch, body).pipe(
      tap((res) => {
        console.log('Venue: ', res)
      })
    )
  }

  delete(id: string): Observable<Venue> {
    let urlDelete = this.url + id + '/'
    return this.http.delete<Venue>(urlDelete).pipe(
      tap((res) => {
        console.log('Venue: ', res)
      })
    )
  }

}
