import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { PaymentTicket } from "./payment-tickets.model";

@Injectable({
  providedIn: "root",
})
export class PaymentTicketsService {
  // URL
  public url: string = environment.baseUrl + "v1/payment-tickets/";

  // Data
  public paymentTickets: PaymentTicket[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<PaymentTicket> {
    return this.http.post<PaymentTicket>(this.url, body).pipe(
      tap((res) => {
        console.log("Payment ticket: ", res);
      })
    );
  }

  get(): Observable<PaymentTicket[]> {
    return this.http.get<PaymentTicket[]>(this.url).pipe(
      tap((res) => {
        this.paymentTickets = res;
        console.log("Payment tickets: ", res);
      })
    );
  }

  update(body: Form, id: string): Observable<PaymentTicket> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<PaymentTicket>(urlPatch, body).pipe(
      tap((res) => {
        console.log("Payment ticket: ", res);
      })
    );
  }

  delete(id: string): Observable<PaymentTicket> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<PaymentTicket>(urlDelete).pipe(
      tap((res) => {
        console.log("Payment ticket: ", res);
      })
    );
  }
}
