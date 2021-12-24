import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { InvoiceReceipt } from "./invoice-receipts.model";

@Injectable({
  providedIn: "root",
})
export class InvoiceReceiptsService {
  // URL
  public url: string = environment.baseUrl + "v1/invoice-receipts/";

  // Data
  public invoicereceipts: InvoiceReceipt[] = [];

  constructor(private http: HttpClient) {}

  post(body): Observable<InvoiceReceipt> {
    return this.http.post<InvoiceReceipt>(this.url, body).pipe(
      tap((res) => {
        console.log("InvoiceReceipt: ", res);
      })
    );
  }

  get(): Observable<InvoiceReceipt[]> {
    return this.http.get<InvoiceReceipt[]>(this.url).pipe(
      tap((res) => {
        this.invoicereceipts = res;
        console.log("InvoiceReceipts: ", res);
      })
    );
  }

  update(body, id: string): Observable<InvoiceReceipt> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<InvoiceReceipt>(urlPatch, body).pipe(
      tap((res) => {
        console.log("InvoiceReceipt: ", res);
      })
    );
  }

  delete(id: string): Observable<InvoiceReceipt> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<InvoiceReceipt>(urlDelete).pipe(
      tap((res) => {
        console.log("InvoiceReceipt: ", res);
      })
    );
  }

  filter(field: String): Observable<InvoiceReceipt[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<InvoiceReceipt[]>(urlFilter).pipe(
      tap((res) => {
        console.log("InvoiceReceipts: ", res);
      })
    );
  }

  extended(field): Observable<InvoiceReceipt[]> {
    let urlExtended = "";
    if (field) urlExtended = this.url + "extended/?" + field;
    else urlExtended = this.url + "extended";
    return this.http.get<InvoiceReceipt[]>(urlExtended).pipe(
      tap((res) => {
        console.log("InvoiceReceipts: ", res);
      })
    );
  }

  delete_invoice_receipt(body): Observable<InvoiceReceipt> {
    let url = this.url + "delete_invoice_receipt/";
    return this.http.post<InvoiceReceipt>(url, body).pipe(
      tap((res) => {
        console.log("InvoiceReceipt: ", res);
      })
    );
  }

  generateReceipt(field: string): Observable<any> {
    var HTTPOptions = {
      'responseType': 'blob' as 'json'
    }

    return this.http.get<any>(this.url + "generate_receipt?" + field, HTTPOptions);
  }


}
