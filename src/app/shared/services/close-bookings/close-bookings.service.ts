import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { CloseBooking } from "./close-bookings.model";

@Injectable({
  providedIn: "root",
})
export class CloseBookingsService {
  // URL
  public url: string = environment.baseUrl + "v1/close-bookings/";

  // Data
  public closebookings: CloseBooking[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<CloseBooking> {
    return this.http.post<CloseBooking>(this.url, body).pipe(
      tap((res) => {
        console.log("CloseBooking: ", res);
      })
    );
  }

  get(): Observable<CloseBooking[]> {
    return this.http.get<CloseBooking[]>(this.url).pipe(
      tap((res) => {
        this.closebookings = res;
        console.log("CloseBookings: ", res);
      })
    );
  }

  update(body, id: string): Observable<CloseBooking> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<CloseBooking>(urlPatch, body).pipe(
      tap((res) => {
        console.log("CloseBooking: ", res);
      })
    );
  }

  delete(id: string): Observable<CloseBooking> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<CloseBooking>(urlDelete).pipe(
      tap((res) => {
        console.log("CloseBooking: ", res);
      })
    );
  }

  filter(field: String): Observable<CloseBooking[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<CloseBooking[]>(urlFilter).pipe(
      tap((res) => {
        console.log("CloseBookings: ", res);
      })
    );
  }

  extended(): Observable<CloseBooking[]> {
    return this.http.get<CloseBooking[]>(this.url + "extended").pipe(
      tap((res) => {
        this.closebookings = res;
        console.log("CloseBookings: ", res);
      })
    );
  }
}
