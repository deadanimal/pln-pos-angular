import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { VirtualLibraryBook } from "./virtual-library-books.model";

@Injectable({
  providedIn: "root",
})
export class VirtualLibraryBooksService {
  // URL
  public url: string = environment.baseUrl + "v1/virtual-library-books/";

  // Data
  public virtuallibraries: VirtualLibraryBook[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<VirtualLibraryBook> {
    return this.http.post<VirtualLibraryBook>(this.url, body).pipe(
      tap((res) => {
        console.log("Virtual library: ", res);
      })
    );
  }

  get(): Observable<VirtualLibraryBook[]> {
    return this.http.get<VirtualLibraryBook[]>(this.url).pipe(
      tap((res) => {
        this.virtuallibraries = res;
        console.log("Virtual libraries: ", res);
      })
    );
  }

  update(body, id: string): Observable<VirtualLibraryBook> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<VirtualLibraryBook>(urlPatch, body).pipe(
      tap((res) => {
        console.log("Virtual library: ", res);
      })
    );
  }

  delete(id: string): Observable<VirtualLibraryBook> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<VirtualLibraryBook>(urlDelete).pipe(
      tap((res) => {
        console.log("Virtual library: ", res);
      })
    );
  }

  filter(field: string): Observable<VirtualLibraryBook[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<VirtualLibraryBook[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Virtual libraries: ", res);
      })
    );
  }

  extended(): Observable<VirtualLibraryBook[]> {
    return this.http.get<VirtualLibraryBook[]>(this.url + "extended").pipe(
      tap((res) => {
        this.virtuallibraries = res;
        console.log("Virtual libraries: ", res);
      })
    );
  }
}
