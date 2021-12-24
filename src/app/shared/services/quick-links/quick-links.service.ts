import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { QuickLink } from "./quick-links.model";

@Injectable({
  providedIn: "root",
})
export class QuickLinksService {
  // URL
  public url: string = environment.baseUrl + "v1/quick-links/";

  // Data
  public quicklinks: QuickLink[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<QuickLink> {
    return this.http.post<QuickLink>(this.url, body).pipe(
      tap((res) => {
        console.log("QuickLink: ", res);
      })
    );
  }

  get(): Observable<QuickLink[]> {
    return this.http.get<QuickLink[]>(this.url).pipe(
      tap((res) => {
        this.quicklinks = res;
        console.log("QuickLinks: ", res);
      })
    );
  }

  update(body, id: string): Observable<QuickLink> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<QuickLink>(urlPatch, body).pipe(
      tap((res) => {
        console.log("QuickLink: ", res);
      })
    );
  }

  delete(id: string): Observable<QuickLink> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<QuickLink>(urlDelete).pipe(
      tap((res) => {
        console.log("QuickLink: ", res);
      })
    );
  }

  filter(field: String): Observable<QuickLink[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<QuickLink[]>(urlFilter).pipe(
      tap((res) => {
        console.log("QuickLinks: ", res);
      })
    );
  }

  extended(): Observable<QuickLink[]> {
    return this.http.get<QuickLink[]>(this.url + "extended").pipe(
      tap((res) => {
        this.quicklinks = res;
        console.log("QuickLinks: ", res);
      })
    );
  }
}
