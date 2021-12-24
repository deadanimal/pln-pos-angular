import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { VirtualLibraryESource } from "./virtual-library-esources.model";

@Injectable({
  providedIn: "root",
})
export class VirtualLibraryESourcesService {
  // URL
  public url: string = environment.baseUrl + "v1/virtual-library-esources/";

  // Data
  public virtuallibraries: VirtualLibraryESource[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<VirtualLibraryESource> {
    return this.http.post<VirtualLibraryESource>(this.url, body).pipe(
      tap((res) => {
        console.log("Virtual library: ", res);
      })
    );
  }

  get(): Observable<VirtualLibraryESource[]> {
    return this.http.get<VirtualLibraryESource[]>(this.url).pipe(
      tap((res) => {
        this.virtuallibraries = res;
        console.log("Virtual libraries: ", res);
      })
    );
  }

  update(body: Form, id: string): Observable<VirtualLibraryESource> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<VirtualLibraryESource>(urlPatch, body).pipe(
      tap((res) => {
        console.log("Virtual library: ", res);
      })
    );
  }

  delete(id: string): Observable<VirtualLibraryESource> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<VirtualLibraryESource>(urlDelete).pipe(
      tap((res) => {
        console.log("Virtual library: ", res);
      })
    );
  }

  filter(field: string): Observable<VirtualLibraryESource[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<VirtualLibraryESource[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Virtual libraries: ", res);
      })
    );
  }

  extended(): Observable<VirtualLibraryESource[]> {
    return this.http.get<VirtualLibraryESource[]>(this.url + "extended").pipe(
      tap((res) => {
        this.virtuallibraries = res;
        console.log("Virtual libraries: ", res);
      })
    );
  }
}
