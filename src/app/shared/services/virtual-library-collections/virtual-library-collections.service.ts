import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { VirtualLibraryCollection } from "./virtual-library-collections.model";

@Injectable({
  providedIn: "root",
})
export class VirtualLibraryCollectionsService {
  // URL
  public url: string = environment.baseUrl + "v1/virtual-library-collections/";

  // Data
  public virtuallibraries: VirtualLibraryCollection[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<VirtualLibraryCollection> {
    return this.http.post<VirtualLibraryCollection>(this.url, body).pipe(
      tap((res) => {
        console.log("Virtual library: ", res);
      })
    );
  }

  get(): Observable<VirtualLibraryCollection[]> {
    return this.http.get<VirtualLibraryCollection[]>(this.url).pipe(
      tap((res) => {
        this.virtuallibraries = res;
        console.log("Virtual libraries: ", res);
      })
    );
  }

  update(body: Form, id: string): Observable<VirtualLibraryCollection> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<VirtualLibraryCollection>(urlPatch, body).pipe(
      tap((res) => {
        console.log("Virtual library: ", res);
      })
    );
  }

  delete(id: string): Observable<VirtualLibraryCollection> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<VirtualLibraryCollection>(urlDelete).pipe(
      tap((res) => {
        console.log("Virtual library: ", res);
      })
    );
  }

  filter(field: string): Observable<VirtualLibraryCollection[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<VirtualLibraryCollection[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Virtual libraries: ", res);
      })
    );
  }

  extended(): Observable<VirtualLibraryCollection[]> {
    return this.http
      .get<VirtualLibraryCollection[]>(this.url + "extended")
      .pipe(
        tap((res) => {
          this.virtuallibraries = res;
          console.log("Virtual libraries: ", res);
        })
      );
  }
}
