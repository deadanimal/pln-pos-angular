import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { VirtualLibraryArticle } from "./virtual-library-articles.model";

@Injectable({
  providedIn: "root",
})
export class VirtualLibraryArticlesService {
  // URL
  public url: string = environment.baseUrl + "v1/virtual-library-articles/";

  // Data
  public virtuallibraries: VirtualLibraryArticle[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<VirtualLibraryArticle> {
    return this.http.post<VirtualLibraryArticle>(this.url, body).pipe(
      tap((res) => {
        console.log("Virtual library: ", res);
      })
    );
  }

  get(): Observable<VirtualLibraryArticle[]> {
    return this.http.get<VirtualLibraryArticle[]>(this.url).pipe(
      tap((res) => {
        this.virtuallibraries = res;
        console.log("Virtual libraries: ", res);
      })
    );
  }

  update(body, id: string): Observable<VirtualLibraryArticle> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<VirtualLibraryArticle>(urlPatch, body).pipe(
      tap((res) => {
        console.log("Virtual library: ", res);
      })
    );
  }

  delete(id: string): Observable<VirtualLibraryArticle> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<VirtualLibraryArticle>(urlDelete).pipe(
      tap((res) => {
        console.log("Virtual library: ", res);
      })
    );
  }

  filter(field: string): Observable<VirtualLibraryArticle[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<VirtualLibraryArticle[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Virtual libraries: ", res);
      })
    );
  }

  extended(): Observable<VirtualLibraryArticle[]> {
    return this.http.get<VirtualLibraryArticle[]>(this.url + "extended").pipe(
      tap((res) => {
        this.virtuallibraries = res;
        console.log("Virtual libraries: ", res);
      })
    );
  }
}
