import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { VirtualLibraryCategory } from "./virtual-library-categories.model";

@Injectable({
  providedIn: "root",
})
export class VirtualLibraryCategoriesService {
  // URL
  public url: string = environment.baseUrl + "v1/virtual-library-categories/";

  // Data
  public virtuallibraries: VirtualLibraryCategory[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<VirtualLibraryCategory> {
    return this.http.post<VirtualLibraryCategory>(this.url, body).pipe(
      tap((res) => {
        console.log("Virtual library: ", res);
      })
    );
  }

  get(): Observable<VirtualLibraryCategory[]> {
    return this.http.get<VirtualLibraryCategory[]>(this.url).pipe(
      tap((res) => {
        this.virtuallibraries = res;
        console.log("Virtual libraries: ", res);
      })
    );
  }

  update(body: Form, id: string): Observable<VirtualLibraryCategory> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<VirtualLibraryCategory>(urlPatch, body).pipe(
      tap((res) => {
        console.log("Virtual library: ", res);
      })
    );
  }

  delete(id: string): Observable<VirtualLibraryCategory> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<VirtualLibraryCategory>(urlDelete).pipe(
      tap((res) => {
        console.log("Virtual library: ", res);
      })
    );
  }

  filter(field: string): Observable<VirtualLibraryCategory[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<VirtualLibraryCategory[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Virtual libraries: ", res);
      })
    );
  }

  extended(): Observable<VirtualLibraryCategory[]> {
    return this.http.get<VirtualLibraryCategory[]>(this.url + "extended").pipe(
      tap((res) => {
        this.virtuallibraries = res;
        console.log("Virtual libraries: ", res);
      })
    );
  }
}
