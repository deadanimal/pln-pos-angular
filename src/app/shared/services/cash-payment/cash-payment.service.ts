import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { CashTransactions } from "./cash-payment.model";


@Injectable({
  providedIn: 'root'
})
export class CashPaymentService {
  // URL
  public url: string = environment.baseUrl + "v1/cash-transactions/";

  // data
  cashTransactions: CashTransactions[] = [];

  constructor(private http: HttpClient) { }

  post(body): Observable<CashTransactions> {
    return this.http.post<CashTransactions>(this.url, body).pipe(
      tap((res) => {
        console.log("CashTransactions: ", res);
      })
    );
  }

  get(): Observable<CashTransactions[]> {
    return this.http.get<CashTransactions[]>(this.url).pipe(
      tap((res) => {
        this.cashTransactions = res;
        console.log("CashTransactionss: ", res);
      })
    );
  }

  update(body, id: string): Observable<CashTransactions> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<CashTransactions>(urlPatch, body).pipe(
      tap((res) => {
        console.log("CashTransactions: ", res);
      })
    );
  }

  delete(id: string): Observable<CashTransactions> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<CashTransactions>(urlDelete).pipe(
      tap((res) => {
        console.log("CashTransactions: ", res);
      })
    );
  }

  filter(field: String): Observable<CashTransactions[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<CashTransactions[]>(urlFilter).pipe(
      tap((res) => {
        console.log("CashTransactionss: ", res);
      })
    );
  }

  extended(field): Observable<CashTransactions[]> {
    let urlExtended = "";
    if (field) urlExtended = this.url + "extended/?" + field;
    else urlExtended = this.url + "extended";
    return this.http.get<CashTransactions[]>(urlExtended).pipe(
      tap((res) => {
        console.log("CashTransactionss: ", res);
      })
    );
  }

}
