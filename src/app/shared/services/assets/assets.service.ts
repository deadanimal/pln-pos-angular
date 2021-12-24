import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Asset } from './assets.model';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  // URL
  public url: string = environment.baseUrl + 'v1/assets/'

  // Data
  public assets: Asset[] = []

  constructor(
    private http: HttpClient
  ) { }

  post(body: Form): Observable<Asset> {
    return this.http.post<Asset>(this.url, body).pipe(
      tap((res) => {
        console.log('Asset: ', res)
      })
    )
  }

  get(): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.url).pipe(
      tap((res) => {
        this.assets = res
        console.log('Assets: ', res)
      })
    )
  }

  update(body: Form, id: string): Observable<Asset>  {
    let urlPatch = this.url + id + '/'
    return this.http.patch<Asset>(urlPatch, body).pipe(
      tap((res) => {
        console.log('Asset: ', res)
      })
    )
  }

  delete(id: string): Observable<Asset> {
    let urlDelete = this.url + id + '/'
    return this.http.delete<Asset>(urlDelete).pipe(
      tap((res) => {
        console.log('Asset: ', res)
      })
    )
  }

}
