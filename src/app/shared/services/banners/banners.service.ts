import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Banner } from "./banners.model";

@Injectable({
  providedIn: "root",
})
export class BannersService {
  // URL
  public url: string = environment.baseUrl + "v1/banners/";

  // Data
  public banners: Banner[] = [];

  constructor(private http: HttpClient) {}

  post(body): Observable<Banner> {
    return this.http.post<Banner>(this.url, body).pipe(
      tap((res) => {
        console.log("Banner: ", res);
      })
    );
  }

  get(): Observable<Banner[]> {
    return this.http.get<Banner[]>(this.url).pipe(
      tap((res) => {
        this.banners = res;
        console.log("Banners: ", res);
      })
    );
  }

  update(body, id: string): Observable<Banner> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<Banner>(urlPatch, body).pipe(
      tap((res) => {
        console.log("Banner: ", res);
      })
    );
  }

  delete(id: string): Observable<Banner> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<Banner>(urlDelete).pipe(
      tap((res) => {
        console.log("Banner: ", res);
      })
    );
  }

  filter(field: String): Observable<Banner[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<Banner[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Banners: ", res);
      })
    );
  }

  extended(): Observable<Banner[]> {
    return this.http.get<Banner[]>(this.url + "extended").pipe(
      tap((res) => {
        this.banners = res;
        console.log("Banners: ", res);
      })
    );
  }
}
