import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Refund } from "./refunds.model";

@Injectable({
  providedIn: "root",
})
export class RefundsService {
  // URL
  public url: string = environment.baseUrl + "v1/refunds/";

  // Data
  public refunds: Refund[] = [];

  constructor(private http: HttpClient) {}

  post(body): Observable<Refund> {
    return this.http.post<Refund>(this.url, body).pipe(
      tap((res) => {
        console.log("Refund: ", res);
      })
    );
  }

  get(): Observable<Refund[]> {
    return this.http.get<Refund[]>(this.url).pipe(
      tap((res) => {
        this.refunds = res;
        console.log("Refunds: ", res);
      })
    );
  }

  update(body, id: string): Observable<Refund> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<Refund>(urlPatch, body).pipe(
      tap((res) => {
        console.log("Refund: ", res);
      })
    );
  }

  delete(id: string): Observable<Refund> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<Refund>(urlDelete).pipe(
      tap((res) => {
        console.log("Refund: ", res);
      })
    );
  }

  filter(field: String): Observable<Refund[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<Refund[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Refunds: ", res);
      })
    );
  }

  extended(field): Observable<Refund[]> {
    let urlExtended = "";
    if (field) urlExtended = this.url + "extended/?" + field;
    else urlExtended = this.url + "extended";
    return this.http.get<Refund[]>(urlExtended).pipe(
      tap((res) => {
        console.log("Refunds: ", res);
      })
    );
  }
}
