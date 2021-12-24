import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { VirtualLibraryESourceCategory } from "./virtual-library-esource-categories.model";

@Injectable({
  providedIn: "root",
})
export class VirtualLibraryESourceCategoriesService {
  // URL
  public url: string =
    environment.baseUrl + "v1/virtual-library-esource-categories/";

  // Data
  public virtuallibraries: VirtualLibraryESourceCategory[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<VirtualLibraryESourceCategory> {
    return this.http.post<VirtualLibraryESourceCategory>(this.url, body).pipe(
      tap((res) => {
        console.log("Virtual library: ", res);
      })
    );
  }

  get(): Observable<VirtualLibraryESourceCategory[]> {
    return this.http.get<VirtualLibraryESourceCategory[]>(this.url).pipe(
      tap((res) => {
        this.virtuallibraries = res;
        console.log("Virtual libraries: ", res);
      })
    );
  }

  update(body: Form, id: string): Observable<VirtualLibraryESourceCategory> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<VirtualLibraryESourceCategory>(urlPatch, body).pipe(
      tap((res) => {
        console.log("Virtual library: ", res);
      })
    );
  }

  delete(id: string): Observable<VirtualLibraryESourceCategory> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<VirtualLibraryESourceCategory>(urlDelete).pipe(
      tap((res) => {
        console.log("Virtual library: ", res);
      })
    );
  }

  filter(field: string): Observable<VirtualLibraryESourceCategory[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<VirtualLibraryESourceCategory[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Virtual libraries: ", res);
      })
    );
  }

  extended(): Observable<VirtualLibraryESourceCategory[]> {
    return this.http
      .get<VirtualLibraryESourceCategory[]>(this.url + "extended")
      .pipe(
        tap((res) => {
          this.virtuallibraries = res;
          console.log("Virtual libraries: ", res);
        })
      );
  }
}
