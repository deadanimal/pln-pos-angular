import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Publication } from "./publications.model";

@Injectable({
  providedIn: "root",
})
export class PublicationsService {
  // URL
  public url: string = environment.baseUrl + "v1/publications/";

  // Data
  public publications: Publication[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<Publication> {
    return this.http.post<Publication>(this.url, body).pipe(
      tap((res) => {
        console.log("Publication: ", res);
      })
    );
  }

  get(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.url).pipe(
      tap((res) => {
        this.publications = res;
        console.log("Publications: ", res);
      })
    );
  }

  update(body, id: string): Observable<Publication> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<Publication>(urlPatch, body).pipe(
      tap((res) => {
        console.log("Publication: ", res);
      })
    );
  }

  delete(id: string): Observable<Publication> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<Publication>(urlDelete).pipe(
      tap((res) => {
        console.log("Publication: ", res);
      })
    );
  }

  filter(field: String): Observable<Publication[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<Publication[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Publications: ", res);
      })
    );
  }

  extended(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.url + "extended").pipe(
      tap((res) => {
        this.publications = res;
        console.log("Publications: ", res);
      })
    );
  }
}
