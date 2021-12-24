import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { VirtualLibraryArchiveKutubkhanah } from "./virtual-library-archivekutubkhanahs.model";

@Injectable({
  providedIn: "root",
})
export class VirtualLibraryArchiveKutubkhanahsService {
  // URL
  public url: string =
    environment.baseUrl + "v1/virtual-library-archivekutubkhanahs/";

  // Data
  public virtuallibraries: VirtualLibraryArchiveKutubkhanah[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<VirtualLibraryArchiveKutubkhanah> {
    return this.http
      .post<VirtualLibraryArchiveKutubkhanah>(this.url, body)
      .pipe(
        tap((res) => {
          console.log("Virtual library: ", res);
        })
      );
  }

  get(): Observable<VirtualLibraryArchiveKutubkhanah[]> {
    return this.http.get<VirtualLibraryArchiveKutubkhanah[]>(this.url).pipe(
      tap((res) => {
        this.virtuallibraries = res;
        console.log("Virtual libraries: ", res);
      })
    );
  }

  update(body: Form, id: string): Observable<VirtualLibraryArchiveKutubkhanah> {
    let urlPatch = this.url + id + "/";
    return this.http
      .patch<VirtualLibraryArchiveKutubkhanah>(urlPatch, body)
      .pipe(
        tap((res) => {
          console.log("Virtual library: ", res);
        })
      );
  }

  delete(id: string): Observable<VirtualLibraryArchiveKutubkhanah> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<VirtualLibraryArchiveKutubkhanah>(urlDelete).pipe(
      tap((res) => {
        console.log("Virtual library: ", res);
      })
    );
  }

  filter(field: string): Observable<VirtualLibraryArchiveKutubkhanah[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<VirtualLibraryArchiveKutubkhanah[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Virtual libraries: ", res);
      })
    );
  }

  extended(): Observable<VirtualLibraryArchiveKutubkhanah[]> {
    return this.http
      .get<VirtualLibraryArchiveKutubkhanah[]>(this.url + "extended")
      .pipe(
        tap((res) => {
          this.virtuallibraries = res;
          console.log("Virtual libraries: ", res);
        })
      );
  }
}
