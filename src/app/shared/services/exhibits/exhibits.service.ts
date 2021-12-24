import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Exhibit } from './exhibits.model';

@Injectable({
  providedIn: 'root'
})
export class ExhibitsService {

  // URL
  public url: string = environment.baseUrl + 'v1/exhibits/'

  // Data
  public exhibits: Exhibit[] = []

  constructor(
    private http: HttpClient
  ) { }

  post(body: Form): Observable<Exhibit> {
    return this.http.post<Exhibit>(this.url, body).pipe(
      tap((res) => {
        console.log('Exhibit: ', res)
      })
    )
  }

  get(): Observable<Exhibit[]> {
    return this.http.get<Exhibit[]>(this.url).pipe(
      tap((res) => {
        this.exhibits = res
        console.log('Exhibits: ', res)
      })
    )
  }

  update(body: Form, id: string): Observable<Exhibit>  {
    let urlPatch = this.url + id + '/'
    return this.http.patch<Exhibit>(urlPatch, body).pipe(
      tap((res) => {
        console.log('Exhibit: ', res)
      })
    )
  }

  delete(id: string): Observable<Exhibit> {
    let urlDelete = this.url + id + '/'
    return this.http.delete<Exhibit>(urlDelete).pipe(
      tap((res) => {
        console.log('Exhibit: ', res)
      })
    )
  }

  filter(field: string): Observable<Exhibit[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<Exhibit[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Exhibits: ", res);
      })
    );
  }

  extended(): Observable<Exhibit[]> {
    return this.http.get<Exhibit[]>(this.url + "extended").pipe(
      tap((res) => {
        console.log("Exhibits: ", res);
      })
    );
  }

}
