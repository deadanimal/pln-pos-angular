import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Showing } from './showings.model';

@Injectable({
  providedIn: 'root'
})
export class ShowingsService {

  // URL
  public url: string = environment.baseUrl + 'v1/showings/'

  // Data
  public showings: Showing[] = []

  constructor(
    private http: HttpClient
  ) { }

  post(body: Form): Observable<Showing> {
    return this.http.post<Showing>(this.url, body).pipe(
      tap((res) => {
        console.log('Showing: ', res)
      })
    )
  }

  get(): Observable<Showing[]> {
    return this.http.get<Showing[]>(this.url).pipe(
      tap((res) => {
        this.showings = res
        console.log('Showings: ', res)
      })
    )
  }

  getOne(id: string): Observable<Showing> {
    let urlFilter = this.url + id + "/";
    return this.http.get<Showing>(urlFilter).pipe(
      tap((res) => {
        console.log("Showing: ", res);
      })
    );
  }

  update(body: Form, id: string): Observable<Showing>  {
    let urlPatch = this.url + id + '/'
    return this.http.patch<Showing>(urlPatch, body).pipe(
      tap((res) => {
        console.log('Showing: ', res)
      })
    )
  }

  delete(id: string): Observable<Showing> {
    let urlDelete = this.url + id + '/'
    return this.http.delete<Showing>(urlDelete).pipe(
      tap((res) => {
        console.log('Showing: ', res)
      })
    )
  }

  filter(field: String): Observable<Showing[]> {
    let urlFilter = this.url + '?' + field
    return this.http.get<Showing[]>(urlFilter).pipe(
      tap((res) => {
        console.log('Showings', res)
      })
    )
  }

}
