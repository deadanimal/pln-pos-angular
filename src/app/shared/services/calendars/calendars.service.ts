import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Calendar } from "./calendars.model";

@Injectable({
  providedIn: "root",
})
export class CalendarsService {
  // URL
  public url: string = environment.baseUrl + "v1/calendars/";

  // Data
  public calendars: Calendar[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<Calendar> {
    return this.http.post<Calendar>(this.url, body).pipe(
      tap((res) => {
        console.log("Calendar: ", res);
      })
    );
  }

  get(): Observable<Calendar[]> {
    return this.http.get<Calendar[]>(this.url).pipe(
      tap((res) => {
        this.calendars = res;
        console.log("Calendars: ", res);
      })
    );
  }

  update(body: Form, id: string): Observable<Calendar> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<Calendar>(urlPatch, body).pipe(
      tap((res) => {
        console.log("Calendar: ", res);
      })
    );
  }

  delete(id: string): Observable<Calendar> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<Calendar>(urlDelete).pipe(
      tap((res) => {
        console.log("Calendar: ", res);
      })
    );
  }

  filter(field: String): Observable<Calendar[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<Calendar[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Calendars: ", res);
      })
    );
  }
}
