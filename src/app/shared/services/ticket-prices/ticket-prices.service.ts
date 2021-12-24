import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { TicketPrice } from "./ticket-prices.model";

@Injectable({
  providedIn: "root",
})
export class TicketPricesService {
  // URL
  public url: string = environment.baseUrl + "v1/ticket-prices/";

  // Data
  public ticketprices: TicketPrice[] = [];

  constructor(private http: HttpClient) {}

  post(body): Observable<TicketPrice> {
    return this.http.post<TicketPrice>(this.url, body).pipe(
      tap((res) => {
        // console.log("TicketPrice: ", res);
      })
    );
  }

  get(): Observable<TicketPrice[]> {
    return this.http.get<TicketPrice[]>(this.url).pipe(
      tap((res) => {
        this.ticketprices = res;
        // console.log("TicketPrices: ", res);
      })
    );
  }

  update(body, id: string): Observable<TicketPrice> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<TicketPrice>(urlPatch, body).pipe(
      tap((res) => {
        // console.log("TicketPrice: ", res);
      })
    );
  }

  delete(id: string): Observable<TicketPrice> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<TicketPrice>(urlDelete).pipe(
      tap((res) => {
        // console.log("TicketPrice: ", res);
      })
    );
  }

  filter(field: String): Observable<TicketPrice[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<TicketPrice[]>(urlFilter).pipe(
      tap((res) => {
        // console.log("TicketPrices: ", res);
      })
    );
  }
}
