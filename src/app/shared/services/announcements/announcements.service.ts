import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Announcement } from "./announcements.model";

@Injectable({
  providedIn: "root",
})
export class AnnouncementsService {
  // URL
  public url: string = environment.baseUrl + "v1/announcements/";

  // Data
  public announcements: Announcement[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<Announcement> {
    return this.http.post<Announcement>(this.url, body).pipe(
      tap((res) => {
        console.log("Announcement: ", res);
      })
    );
  }

  get(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(this.url).pipe(
      tap((res) => {
        this.announcements = res;
        console.log("Announcements: ", res);
      })
    );
  }

  update(body, id: string): Observable<Announcement> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<Announcement>(urlPatch, body).pipe(
      tap((res) => {
        console.log("Announcement: ", res);
      })
    );
  }

  delete(id: string): Observable<Announcement> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<Announcement>(urlDelete).pipe(
      tap((res) => {
        console.log("Announcement: ", res);
      })
    );
  }

  filter(field: String): Observable<Announcement[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<Announcement[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Announcements: ", res);
      })
    );
  }

  extended(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(this.url + "extended").pipe(
      tap((res) => {
        this.announcements = res;
        console.log("Announcements: ", res);
      })
    );
  }
}
