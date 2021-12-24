import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Voucher } from "./vouchers.models";

@Injectable({
  providedIn: "root",
})
export class VouchersService {
  // URL
  public url: string = environment.baseUrl + "v1/vouchers/";

  // Data
  public vouchers: Voucher[] = [];

  constructor(private http: HttpClient) {}

  post(body): Observable<Voucher> {
    return this.http.post<Voucher>(this.url, body).pipe(
      tap((res) => {
        console.log("Voucher: ", res);
      })
    );
  }

  get(): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(this.url).pipe(
      tap((res) => {
        this.vouchers = res;
        console.log("Vouchers: ", res);
      })
    );
  }

  update(body, id: string): Observable<Voucher> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<Voucher>(urlPatch, body).pipe(
      tap((res) => {
        console.log("Voucher: ", res);
      })
    );
  }

  delete(id: string): Observable<Voucher> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<Voucher>(urlDelete).pipe(
      tap((res) => {
        console.log("Voucher: ", res);
      })
    );
  }

  filter(field: String): Observable<Voucher[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<Voucher[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Vouchers: ", res);
      })
    );
  }

  extended(field): Observable<Voucher[]> {
    let urlExtended = "";
    if (field) urlExtended = this.url + "extended/?" + field;
    else urlExtended = this.url + "extended";
    return this.http.get<Voucher[]>(urlExtended).pipe(
      tap((res) => {
        console.log("Vouchers: ", res);
      })
    );
  }
}
