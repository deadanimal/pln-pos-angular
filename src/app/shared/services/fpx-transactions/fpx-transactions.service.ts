import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { FpxTransaction } from "./fpx-transactions.model";

@Injectable({
  providedIn: "root",
})
export class FpxTransactionsService {
  // URL
  public url: string = environment.baseUrl + "v1/fpx-transactions/";

  // Data
  public fpxtransactions: FpxTransaction[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<FpxTransaction> {
    return this.http.post<FpxTransaction>(this.url, body).pipe(
      tap((res) => {
        console.log("FpxTransaction: ", res);
      })
    );
  }

  get(): Observable<FpxTransaction[]> {
    return this.http.get<FpxTransaction[]>(this.url).pipe(
      tap((res) => {
        this.fpxtransactions = res;
        console.log("FpxTransactions: ", res);
      })
    );
  }

  update(body: Form, id: string): Observable<FpxTransaction> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<FpxTransaction>(urlPatch, body).pipe(
      tap((res) => {
        console.log("FpxTransaction: ", res);
      })
    );
  }

  delete(id: string): Observable<FpxTransaction> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<FpxTransaction>(urlDelete).pipe(
      tap((res) => {
        console.log("FpxTransaction: ", res);
      })
    );
  }

  fpx_get_bank_list(): Observable<FpxTransaction[]> {
    let urlBankList = this.url + 'fpx_get_bank_list';
    return this.http.get<FpxTransaction[]>(urlBankList).pipe(
      tap((res) => {
        console.log("FpxTransactions: ", res);
      })
    );
  }

  fpx_confirm(body): Observable<FpxTransaction> {
    let urlFPXConfirm = this.url + "fpx_confirm_ar/";
    return this.http.post<FpxTransaction>(urlFPXConfirm, body).pipe(
      tap((res) => {
        console.log("FPX Confirm: ", res);
      })
    );
  }

  generate_receipt_pos(body) {
    let receiptUrl = this.url + "generate_receipt_pos/";
    return this.http.post<any>(receiptUrl, body).pipe(
      tap((res) => {
        console.log("Receipt generated: ", res);
      })
    );

  }
}
