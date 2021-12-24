import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { VirtualLibraryArchiveKutubkhanahCategory } from "./virtual-library-archivekutubkhanah-categories.model";

@Injectable({
  providedIn: "root",
})
export class VirtualLibraryArchiveKutubkhanahCategoriesService {
  // URL
  public url: string =
    environment.baseUrl + "v1/virtual-library-archivekutubkhanah-categories/";

  // Data
  public virtuallibraries: VirtualLibraryArchiveKutubkhanahCategory[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<VirtualLibraryArchiveKutubkhanahCategory> {
    return this.http
      .post<VirtualLibraryArchiveKutubkhanahCategory>(this.url, body)
      .pipe(
        tap((res) => {
          console.log("Virtual library: ", res);
        })
      );
  }

  get(): Observable<VirtualLibraryArchiveKutubkhanahCategory[]> {
    return this.http
      .get<VirtualLibraryArchiveKutubkhanahCategory[]>(this.url)
      .pipe(
        tap((res) => {
          this.virtuallibraries = res;
          console.log("Virtual libraries: ", res);
        })
      );
  }

  update(
    body: Form,
    id: string
  ): Observable<VirtualLibraryArchiveKutubkhanahCategory> {
    let urlPatch = this.url + id + "/";
    return this.http
      .patch<VirtualLibraryArchiveKutubkhanahCategory>(urlPatch, body)
      .pipe(
        tap((res) => {
          console.log("Virtual library: ", res);
        })
      );
  }

  delete(id: string): Observable<VirtualLibraryArchiveKutubkhanahCategory> {
    let urlDelete = this.url + id + "/";
    return this.http
      .delete<VirtualLibraryArchiveKutubkhanahCategory>(urlDelete)
      .pipe(
        tap((res) => {
          console.log("Virtual library: ", res);
        })
      );
  }

  filter(
    field: string
  ): Observable<VirtualLibraryArchiveKutubkhanahCategory[]> {
    let urlFilter = this.url + "?" + field;
    return this.http
      .get<VirtualLibraryArchiveKutubkhanahCategory[]>(urlFilter)
      .pipe(
        tap((res) => {
          console.log("Virtual libraries: ", res);
        })
      );
  }

  extended(): Observable<VirtualLibraryArchiveKutubkhanahCategory[]> {
    return this.http
      .get<VirtualLibraryArchiveKutubkhanahCategory[]>(this.url + "extended")
      .pipe(
        tap((res) => {
          this.virtuallibraries = res;
          console.log("Virtual libraries: ", res);
        })
      );
  }
}
