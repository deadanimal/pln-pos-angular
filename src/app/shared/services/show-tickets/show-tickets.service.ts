import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { ShowTicket } from './show-tickets.model';

@Injectable({
  providedIn: 'root'
})
export class ShowTicketsService {

  // URL
  public url: string = environment.baseUrl + 'v1/show-ticket/'

  // Data
  public showTickets: ShowTicket[] = []

  constructor(
    private http: HttpClient
  ) { }
  
  post(body: Form): Observable<ShowTicket> {
    return this.http.post<ShowTicket>(this.url, body).pipe(
      tap((res) => {
        console.log('Show ticket: ', res)
      })
    )
  }

  get(): Observable<ShowTicket[]> {
    return this.http.get<ShowTicket[]>(this.url).pipe(
      tap((res) => {
        this.showTickets = res
        console.log('Show tickets: ', res)
      })
    )
  }

  update(body: Form, id: string): Observable<ShowTicket>  {
    let urlPatch = this.url + id + '/'
    return this.http.patch<ShowTicket>(urlPatch, body).pipe(
      tap((res) => {
        console.log('Show ticket: ', res)
      })
    )
  }

  delete(id: string): Observable<ShowTicket> {
    let urlDelete = this.url + id + '/'
    return this.http.delete<ShowTicket>(urlDelete).pipe(
      tap((res) => {
        console.log('Show ticket: ', res)
      })
    )
  }

  filter(field: String): Observable<ShowTicket[]> {
    let urlFilter = this.url + '?' + field
    return this.http.get<ShowTicket[]>(urlFilter).pipe(
      tap((res) => {
        console.log('ShowTickets', res)
      })
    )
  }

}
